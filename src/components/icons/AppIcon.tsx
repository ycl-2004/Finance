import type { SVGProps } from "react";

export type AppIconName =
  | "arrowRight"
  | "bookOpen"
  | "briefcase"
  | "checkCircle"
  | "clipboard"
  | "compass"
  | "fileText"
  | "graduationCap"
  | "home"
  | "phone"
  | "route"
  | "shieldCheck"
  | "users"
  | "wallet";

type AppIconProps = SVGProps<SVGSVGElement> & {
  name: AppIconName;
};

export function AppIcon({ name, className, ...props }: AppIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={["app-icon", className].filter(Boolean).join(" ")}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: AppIconName) {
  switch (name) {
    case "arrowRight":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      );
    case "bookOpen":
      return (
        <>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H7a3 3 0 0 0-3 3V5.5Z" />
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20" />
          <path d="M8 7h8" />
          <path d="M8 11h7" />
        </>
      );
    case "briefcase":
      return (
        <>
          <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />
          <path d="M5 7h14a2 2 0 0 1 2 2v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5V9a2 2 0 0 1 2-2Z" />
          <path d="M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </>
      );
    case "checkCircle":
      return (
        <>
          <path d="M21 11.1V12a9 9 0 1 1-5.3-8.2" />
          <path d="m9 11.5 2.4 2.4L21 4.3" />
        </>
      );
    case "clipboard":
      return (
        <>
          <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
          <path d="M9 6h6" />
          <path d="M8 12h8" />
          <path d="M8 16h6" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </>
      );
    case "fileText":
      return (
        <>
          <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </>
      );
    case "graduationCap":
      return (
        <>
          <path d="m3 8.5 9-4.5 9 4.5-9 4.5-9-4.5Z" />
          <path d="M7 11v4.2c0 1.5 2.2 2.8 5 2.8s5-1.3 5-2.8V11" />
          <path d="M21 8.5V14" />
        </>
      );
    case "home":
      return (
        <>
          <path d="m4 11 8-7 8 7" />
          <path d="M6 10v10h12V10" />
          <path d="M10 20v-6h4v6" />
        </>
      );
    case "phone":
      return (
        <>
          <path d="M7.5 4.5 10 7l-2 3c1.2 2.4 3.1 4.3 5.5 5.5l3-2 2.5 2.5-1.2 3.1c-.3.7-1 1.2-1.8 1.1C9 19.4 4.6 15 3.8 8c-.1-.8.4-1.5 1.1-1.8l2.6-1.7Z" />
        </>
      );
    case "route":
      return (
        <>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 6H14a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h5.5" />
        </>
      );
    case "shieldCheck":
      return (
        <>
          <path d="M12 3 5 6v5.5c0 4.4 2.8 7.6 7 9.5 4.2-1.9 7-5.1 7-9.5V6l-7-3Z" />
          <path d="m8.8 12.2 2.1 2.1 4.4-4.6" />
        </>
      );
    case "users":
      return (
        <>
          <path d="M16 20a4 4 0 0 0-8 0" />
          <circle cx="12" cy="10" r="3" />
          <path d="M22 20a3.5 3.5 0 0 0-5.2-3" />
          <path d="M2 20a3.5 3.5 0 0 1 5.2-3" />
          <path d="M17 8.5a2.5 2.5 0 0 1 0 5" />
          <path d="M7 8.5a2.5 2.5 0 0 0 0 5" />
        </>
      );
    case "wallet":
      return (
        <>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v12H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
          <path d="M4 8h14a2 2 0 0 1 2 2v2.5h-4.5a2.5 2.5 0 0 0 0 5H20" />
          <path d="M16 15h.01" />
        </>
      );
  }
}
