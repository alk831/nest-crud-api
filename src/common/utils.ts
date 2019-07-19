
export const replaceAt = (
  input: string,
  replaceAt: number,
  replacement: string
): string => {
  const firstPart = input.substring(0, replaceAt);
  const lastPart = input.substring(replacement.length, input.length);
  return firstPart + replacement + lastPart;
}