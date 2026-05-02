export function splitTitleOnComma(title: string): string[] {
  const lines = title
    .split(/[,，]/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 1 ? lines : [title];
}
