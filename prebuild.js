import fs from 'fs/promises'

const tasks = [
  { report: 'reports/chart/index.html', src: 'src/report_chart.ts', name: 'chartReport' },
  { report: 'reports/html/index.html', src: 'src/report_listing.ts', name: 'listingReport' },
]

const buildString = (name, report) => [
  '// autogenerated',
  `export const ${name} = Buffer.from(`,
  `    '${report}',`,
  "    'base64'",
  ')',
  '',
]

for (const t of tasks) {
  const report = await fs.readFile(t.report)
  const data = buildString(t.name, report.toString('base64'))
  await fs.writeFile(t.src, data.join('\n'))
}
