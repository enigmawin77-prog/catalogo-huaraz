import fs from 'node:fs'
import path from 'node:path'

const items = [
  ['laptop', 'PORTÁTIL', 'M2'],
  ['desktop', 'AIO / PC', 'M3'],
  ['cpu', 'PROCESADOR', 'M4'],
  ['gpu', 'GPU', 'M5'],
  ['ram', 'MEMORIA', 'M6'],
  ['keyboard', 'TECLADO', 'M7'],
  ['mouse', 'MOUSE', 'M8'],
  ['phone', 'SMARTPHONE', 'M9'],
  ['tablet', 'TABLET', 'M10'],
  ['gamepad', 'CONTROL', 'M11'],
  ['chair', 'SILLA', 'M12'],
  ['headset', 'AUDIO', 'M13'],
  ['speaker', 'PARLANTE', 'M14'],
  ['ssd', 'SSD', 'M15'],
  ['hdd', 'DISCO', 'M16'],
  ['router', 'ROUTER', 'M17'],
  ['usb', 'ADAPTADOR', 'M18'],
]

const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))

for (const [name, label, code] of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="Imagen provisional ${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0D1220"/>
      <stop offset="1" stop-color="#07090F"/>
    </linearGradient>
  </defs>
  <rect width="640" height="480" fill="url(#g)"/>
  <g opacity="0.25" stroke="#00F5FF" stroke-width="1">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${60 * i}" x2="640" y2="${60 * i}"/>`).join('')}
    ${Array.from({ length: 10 }, (_, i) => `<line x1="${64 * i}" y1="0" x2="${64 * i}" y2="480"/>`).join('')}
  </g>
  <rect x="40" y="36" width="560" height="408" fill="none" stroke="#00F5FF" stroke-opacity="0.45"/>
  <rect x="52" y="48" width="536" height="384" fill="none" stroke="#FF2BD6" stroke-opacity="0.25"/>
  <text x="80" y="90" fill="#00F5FF" font-family="Segoe UI, sans-serif" font-size="13" letter-spacing="4">IMAGEN PROVISIONAL</text>
  <text x="80" y="250" fill="#EAF2FF" font-family="Segoe UI, sans-serif" font-size="42" font-weight="700">${label}</text>
  <text x="80" y="290" fill="#94A3B8" font-family="Segoe UI, sans-serif" font-size="16">Reemplazar en /public/images</text>
  <text x="80" y="400" fill="#8B5CF6" font-family="Consolas, monospace" font-size="14">${code} // CTH-HZ</text>
</svg>`
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg)
}

console.log('placeholders ok')
