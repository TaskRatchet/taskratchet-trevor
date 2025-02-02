export function parseDeadline(_input: string): Date {
  // TODO: Implement deadline parsing from natural language
  return new Date();
}

export function formatDeadline(date: Date): string {
  return date.toISOString();
}
