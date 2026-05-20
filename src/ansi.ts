export function strip(input: string): string {
  return input.replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
}

export function visibleLen(input: string): number {
  return Array.from(strip(input)).length;
}
