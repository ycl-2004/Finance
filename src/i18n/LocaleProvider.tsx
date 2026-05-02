"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { localizeVisibleText, type Locale } from "./domTranslations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "qm-site-locale";
const textOriginals = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ["aria-label", "placeholder", "title"] as const;

function shouldSkipTextNode(node: Text) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (!node.nodeValue?.trim()) return true;
  return Boolean(
    parent.closest(
      "script, style, noscript, code, pre, svg, canvas, textarea, [data-no-translate]"
    )
  );
}

function syncTextNodes(locale: Locale) {
  if (!document.body) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipTextNode(node as Text) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });

  let current = walker.nextNode() as Text | null;
  while (current) {
    const currentValue = current.nodeValue ?? "";
    if (!textOriginals.has(current)) {
      textOriginals.set(current, currentValue);
    } else {
      const previousOriginal = textOriginals.get(current) ?? "";
      const previousLocalized = localizeVisibleText(previousOriginal, locale);
      if (currentValue !== previousOriginal && currentValue !== previousLocalized) {
        textOriginals.set(current, currentValue);
      }
    }
    const original = textOriginals.get(current) ?? "";
    const localized = localizeVisibleText(original, locale);
    if (current.nodeValue !== localized) {
      current.nodeValue = localized;
    }
    current = walker.nextNode() as Text | null;
  }
}

function syncAttributes(locale: Locale) {
  const selector = translatedAttributes.map((attribute) => `[${attribute}]`).join(",");
  document.querySelectorAll(selector).forEach((element) => {
    if (element.closest("[data-no-translate]")) return;
    let originals = attrOriginals.get(element);
    if (!originals) {
      originals = new Map<string, string>();
      attrOriginals.set(element, originals);
    }

    translatedAttributes.forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (!current) return;
      if (!originals.has(attribute)) originals.set(attribute, current);
      const previousOriginal = originals.get(attribute) ?? current;
      const previousLocalized = localizeVisibleText(previousOriginal, locale);
      if (current !== previousOriginal && current !== previousLocalized) {
        originals.set(attribute, current);
      }
      const original = originals.get(attribute) ?? current;
      const localized = localizeVisibleText(original, locale);
      if (current !== localized) element.setAttribute(attribute, localized);
    });
  });
}

function syncDocument(locale: Locale) {
  document.documentElement.lang = locale === "en" ? "en" : "zh-Hans";
  document.documentElement.dataset.locale = locale;
  syncTextNodes(locale);
  syncAttributes(locale);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const localeRef = useRef(locale);
  const frameRef = useRef<number | null>(null);

  const scheduleSync = useMemo(
    () => () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncDocument(localeRef.current);
      });
    },
    []
  );

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
  };

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "en" || saved === "zh") {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    localeRef.current = locale;
    syncDocument(locale);

    const observer = new MutationObserver(scheduleSync);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...translatedAttributes]
    });

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [locale, scheduleSync]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "zh" : "en")
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return value;
}
