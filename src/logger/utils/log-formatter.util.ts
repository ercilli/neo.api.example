export function formatLog(data: Record<string, any>): string {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    ...data,
  });
}