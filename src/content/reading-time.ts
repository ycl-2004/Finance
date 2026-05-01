const CHINESE_CHARS_PER_MINUTE = 450;
const ENGLISH_WORDS_PER_MINUTE = 220;

export function estimateReadingMinutes(markdown: string): number {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const chineseChars = withoutCode.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const englishWords =
    withoutCode
      .replace(/[\u4e00-\u9fff]/g, " ")
      .match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

  const minutes =
    chineseChars / CHINESE_CHARS_PER_MINUTE + englishWords / ENGLISH_WORDS_PER_MINUTE;

  return Math.max(1, Math.ceil(minutes));
}
