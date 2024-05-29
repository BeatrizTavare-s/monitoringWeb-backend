import portscanner from 'portscanner';

export async function checkPort(host: string, port: number) {
  const startTime = Date.now();
  const status = await portscanner.checkPortStatus(port, host);
  const endTime = Date.now();
  const responseTimeMs = endTime - startTime;
  return { status, responseTimeMs };
}