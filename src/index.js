// Engineering unit conversion from exact definitions. Every factor is the value
// of one unit in the SI unit of its category; conversion multiplies by the
// source factor and divides by the target's, so all conversions are consistent.

const FT = 0.3048 // m, exact (international foot, 1959)
const IN = 0.0254 // m, exact
const LB = 0.45359237 // kg, exact (international pound, 1959)
const G0 = 9.80665 // m/s², exact (standard gravity)
const BTU = 1055.05585262 // J, exact (International Table BTU)
const GAL = 3.785411784e-3 // m³, exact (US liquid gallon)
const LBF = LB * G0 // N

/** Value of each unit in the SI unit of its category (Pa, J, W, N, N·m, m³/s, m/s, kg/m³, rad/s). */
export const UNITS = {
  pressure: {
    Pa: 1, kPa: 1e3, MPa: 1e6, GPa: 1e9, bar: 1e5, mbar: 100, atm: 101325,
    psi: LBF / IN ** 2, ksi: (1000 * LBF) / IN ** 2, mmHg: 133.322387415, Torr: 101325 / 760,
    inH2O: 249.08891, 'kgf/cm²': G0 * 1e4,
  },
  energy: { J: 1, kJ: 1e3, MJ: 1e6, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3.6e6, BTU, 'ft·lbf': FT * LBF },
  power: { W: 1, kW: 1e3, MW: 1e6, hp: 550 * FT * LBF, PS: 75 * G0, 'BTU/h': BTU / 3600, TR: (12000 * BTU) / 3600 },
  force: { N: 1, kN: 1e3, kgf: G0, lbf: LBF },
  torque: { 'N·m': 1, 'kN·m': 1e3, 'kgf·m': G0, 'lbf·ft': LBF * FT, 'lbf·in': LBF * IN },
  flow: { 'm³/s': 1, 'm³/h': 1 / 3600, 'L/s': 1e-3, 'L/min': 1e-3 / 60, gpm: GAL / 60, cfm: FT ** 3 / 60 },
  speed: { 'm/s': 1, 'km/h': 1 / 3.6, mph: (5280 * FT) / 3600, knot: 1852 / 3600, 'ft/s': FT },
  density: { 'kg/m³': 1, 'g/cm³': 1000, 'lb/ft³': LB / FT ** 3, 'lb/in³': LB / IN ** 3 },
  angular: { 'rad/s': 1, rpm: (2 * Math.PI) / 60, 'rev/s': 2 * Math.PI, 'deg/s': Math.PI / 180 },
}

/** Convert `value` between two units of one category. NaN for an unknown unit or a non-finite value. */
export function convert(category, value, from, to) {
  const u = UNITS[category]
  if (!u || !(from in u) || !(to in u) || !Number.isFinite(value)) return NaN
  return (value * u[from]) / u[to]
}

/** Spellings people type, mapped to the canonical unit names above. */
const ALIASES = {
  pa: 'Pa', kpa: 'kPa', mpa: 'MPa', gpa: 'GPa', bar: 'bar', mbar: 'mbar', millibar: 'mbar', atm: 'atm', atmosphere: 'atm',
  psi: 'psi', ksi: 'ksi', mmhg: 'mmHg', torr: 'Torr', inh2o: 'inH2O', 'inches of water': 'inH2O', 'in h2o': 'inH2O',
  'kgf/cm2': 'kgf/cm²', 'kgf/cm²': 'kgf/cm²', 'kg/cm2': 'kgf/cm²', 'kg/cm²': 'kgf/cm²',
  j: 'J', kj: 'kJ', mj: 'MJ', cal: 'cal', kcal: 'kcal', wh: 'Wh', kwh: 'kWh', btu: 'BTU', 'ft-lbf': 'ft·lbf', 'ft·lbf': 'ft·lbf',
  w: 'W', kw: 'kW', mw: 'MW', hp: 'hp', ps: 'PS', 'btu/h': 'BTU/h', 'btu/hr': 'BTU/h', btuh: 'BTU/h', tr: 'TR', tons: 'TR', 'tons of refrigeration': 'TR',
  n: 'N', kn: 'kN', kgf: 'kgf', lbf: 'lbf',
  nm: 'N·m', 'n·m': 'N·m', 'n-m': 'N·m', knm: 'kN·m', 'kn·m': 'kN·m', 'kgf·m': 'kgf·m', 'kgf m': 'kgf·m', 'kgm': 'kgf·m',
  'lbf·ft': 'lbf·ft', 'lb-ft': 'lbf·ft', 'lb ft': 'lbf·ft', 'ft lbs': 'lbf·ft', 'ft-lbs': 'lbf·ft', 'ft lb': 'lbf·ft',
  'lbf·in': 'lbf·in', 'in-lb': 'lbf·in', 'in lb': 'lbf·in', 'in lbs': 'lbf·in', 'in-lbs': 'lbf·in',
  'm3/s': 'm³/s', 'm³/s': 'm³/s', 'm3/h': 'm³/h', 'm³/h': 'm³/h', 'l/s': 'L/s', 'l/min': 'L/min', lpm: 'L/min', gpm: 'gpm', cfm: 'cfm',
  'm/s': 'm/s', 'km/h': 'km/h', kmh: 'km/h', kph: 'km/h', mph: 'mph', knot: 'knot', knots: 'knot', kt: 'knot', 'ft/s': 'ft/s', fps: 'ft/s',
  'kg/m3': 'kg/m³', 'kg/m³': 'kg/m³', 'g/cm3': 'g/cm³', 'g/cm³': 'g/cm³', 'lb/ft3': 'lb/ft³', 'lb/ft³': 'lb/ft³', 'lb/in3': 'lb/in³', 'lb/in³': 'lb/in³',
  'rad/s': 'rad/s', rpm: 'rpm', 'rev/s': 'rev/s', rps: 'rev/s', 'deg/s': 'deg/s',
}

/** The category and canonical name of a unit as people write it, or null. */
export function findUnit(name) {
  const canonical = ALIASES[String(name).trim().toLowerCase()]
  if (!canonical) return null
  const category = Object.keys(UNITS).find((c) => canonical in UNITS[c])
  return category ? { category, unit: canonical } : null
}

/**
 * Convert a phrase like "30 psi to bar" or "500 lpm in gpm".
 * Returns { value, from, to, category, result }, or null if it cannot be read
 * or the two units measure different things.
 */
export function convertText(text) {
  const m = String(text).trim().match(/^(-?[\d.,]+(?:e-?\d+)?)\s*(.+?)\s+(?:to|in|into|->)\s+(.+)$/i)
  if (!m) return null
  const value = Number(m[1].replace(/,/g, ''))
  const a = findUnit(m[2]), b = findUnit(m[3])
  if (!Number.isFinite(value) || !a || !b || a.category !== b.category) return null
  return { value, from: a.unit, to: b.unit, category: a.category, result: convert(a.category, value, a.unit, b.unit) }
}
