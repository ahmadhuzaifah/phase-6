import fs from 'node:fs/promises';

const width = Number(process.argv[2] || 390);
const height = Number(process.argv[3] || 844);
const output = process.argv[4] || 'responsive-check.png';
const url = process.argv[5] || 'http://127.0.0.1:4321/';

const target = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(url)}`, { method: 'PUT' }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }));

function send(method, params = {}) {
  const commandId = ++id;
  socket.send(JSON.stringify({ id: commandId, method, params }));
  return new Promise((resolve, reject) => pending.set(commandId, { resolve, reject }));
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: true });
await send('Page.navigate', { url });
await new Promise((resolve) => setTimeout(resolve, 1200));

const metrics = await send('Runtime.evaluate', {
  expression: `(() => {
    const clientWidth = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .map((element) => { const rect = element.getBoundingClientRect(); return { tag: element.tagName, className: element.className?.toString?.() || '', left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) }; })
      .filter((item) => item.right > clientWidth + 1 || item.left < -1)
      .sort((a, b) => b.right - a.right)
      .slice(0, 12);
    return { innerWidth, clientWidth, scrollWidth: document.documentElement.scrollWidth, offenders };
  })()`,
  returnByValue: true,
});
const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
await fs.writeFile(output, Buffer.from(screenshot.data, 'base64'));
console.log(JSON.stringify(metrics.result.value));
socket.close();
