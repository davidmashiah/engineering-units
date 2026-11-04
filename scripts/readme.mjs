// Writes README.md from the code, so the unit tables and examples cannot drift
// from what the package does. Run: node scripts/readme.mjs
import fs from 'node:fs'
import { UNITS, convert, convertText } from '../src/index.js'

const SI = { pressure: 'Pa', energy: 'J', power: 'W', force: 'N', torque: 'N·m', flow: 'm³/s', speed: 'm/s', density: 'kg/m³', angular: 'rad/s' }
const NAMES = { pressure: 'Pressure', energy: 'Energy', power: 'Power', force: 'Force', torque: 'Torque', flow: 'Flow rate', speed: 'Speed', density: 'Density', angular: 'Angular speed' }
const fmt = (x) => (x === 1 ? '1' : String(+x.toPrecision(12)))
const tables = Object.entries(UNITS)
  .map(([c, u]) => `**${NAMES[c]}** (SI unit: ${SI[c]})\n\n| Unit | In ${SI[c]} |\n|---|---|\n${Object.entries(u).map(([n, f]) => `| ${n} | ${fmt(f)} |`).join('\n')}`)
  .join('\n\n')

const T = 'https://taueng.com/en/tools/convert/'
const pages = [['psi to bar', 'psi-to-bar'], ['bar to psi', 'bar-to-psi'], ['MPa to ksi', 'mpa-to-ksi'], ['ksi to MPa', 'ksi-to-mpa'],
  ['psi to MPa', 'psi-to-mpa'], ['N·m to lbf·ft', 'nm-to-lbf-ft'], ['kW to hp', 'kw-to-hp'], ['kW to BTU/h', 'kw-to-btu-h'],
  ['L/min to gpm', 'lpm-to-gpm'], ['m³/h to cfm', 'm3-h-to-cfm'], ['knots to mph', 'knots-to-mph'], ['kg/m³ to lb/ft³', 'kg-m3-to-lb-ft3'],
  ['rpm to rad/s', 'rpm-to-rad-s'], ['kW to refrigeration tons', 'kw-to-refrigeration-tons']]

const show = (x) => String(+x.toPrecision(14))
const ex = [
  ["convert('pressure', 30, 'psi', 'bar')", show(convert('pressure', 30, 'psi', 'bar'))],
  ["convert('power', 1, 'TR', 'kW')", `${show(convert('power', 1, 'TR', 'kW'))} (one ton of refrigeration)`],
  ["convert('flow', 500, 'L/min', 'gpm')", show(convert('flow', 500, 'L/min', 'gpm'))],
]
const t1 = convertText('100 ft lbs to nm')
const code = [
  "import { convert, convertText } from 'engineering-units'",
  '',
  ...ex.map(([a, b]) => `${a.padEnd(40)}// ${b}`),
  '',
  `${"convertText('100 ft lbs to nm')".padEnd(40)}// { value: 100, from: '${t1.from}', to: '${t1.to}', category: '${t1.category}', result: ${show(t1.result)} }`,
  `${"convertText('1,000 kg/cm2 -> MPa')".padEnd(40)}// result: ${show(convertText('1,000 kg/cm2 -> MPa').result)}`,
  `${"convertText('5 psi to mph')".padEnd(40)}// null: different kinds of quantity`,
].join('\n')

const readme = `# engineering-units

Engineering unit conversion from exact definitions, in plain JavaScript with zero
dependencies. It covers the units engineers actually meet, including the ones general
converters handle loosely: ksi, kgf/cm², inches of water, horsepower vs metric
horsepower, BTU/h, refrigeration tons, gpm and cfm. It also reads text the way people
type it.

\`\`\`sh
npm install engineering-units
\`\`\`

\`\`\`js
${code}
\`\`\`

\`convert\` returns \`NaN\` for an unknown unit or a non-finite value, never a number that
looks right and is not. \`findUnit\` maps spellings such as "lpm", "ft lbs", "kg/cm2",
"btu/hr" or "knots" to the canonical unit. An ES module for Node 18+ and browsers,
with TypeScript types.

## Where the numbers come from

Every factor is derived from an exact definition, not typed in: the international
foot (0.3048 m) and pound (0.45359237 kg), standard gravity (9.80665 m/s²), the
International Table BTU (1055.05585262 J), the US gallon (3.785411784 L), the
standard atmosphere (101325 Pa) and the nautical mile (1852 m). So psi is lbf/in²,
horsepower is 550 ft·lbf/s, and a refrigeration ton is 12000 BTU/h. Two are
conventional values: 1 mmHg = 133.322387415 Pa and 1 inH2O = 249.08891 Pa (at 4 °C).
The test suite checks units against published values and round-trips every pair.

## Units

${tables}

## Conversion pages

Each common pair has a page with the answer, a live converter, the formula and a
table, built on this library at taueng.com: ${pages.map(([t, s]) => `[${t}](${T}${s}/)`).join(', ')},
and the full [engineering unit converter](https://taueng.com/en/tools/units/).

## Cite

Mashiah, D. (2026). engineering-units: engineering unit conversion from exact definitions in
JavaScript. Zenodo. [doi.org/10.5281/zenodo.23938912](https://doi.org/10.5281/zenodo.23938912)

## Author

[David Mashiah](https://davidmashiah.com). Also by the same author:
[engineering-tables](https://github.com/davidmashiah/engineering-tables), steam tables
(IAPWS-IF97) and statistical tables. MIT licensed.
`
fs.writeFileSync(new URL('../README.md', import.meta.url), readme)
console.log('README.md written,', readme.split('\n').length, 'lines')
