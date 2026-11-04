// Conversion factors against exact definitions and published values.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { UNITS, convert, convertText, findUnit } from '../src/index.js'

const near = (a, b, rel = 1e-10) => assert.ok(Math.abs(a / b - 1) <= rel, `${a} is not ≈ ${b}`)

test('pressure', () => {
  near(convert('pressure', 1, 'psi', 'Pa'), 6894.757293168, 1e-12)
  near(convert('pressure', 1, 'ksi', 'MPa'), 6.894757293168, 1e-12)
  near(convert('pressure', 1, 'atm', 'psi'), 14.69594877551, 1e-11)
  near(convert('pressure', 760, 'Torr', 'atm'), 1)
  near(convert('pressure', 1, 'kgf/cm²', 'bar'), 0.980665)
  near(convert('pressure', 1, 'psi', 'inH2O'), 27.679904, 1e-7)
})

test('energy, power, force, torque', () => {
  near(convert('energy', 1, 'kWh', 'BTU'), 3412.14163, 1e-8)
  near(convert('energy', 1, 'ft·lbf', 'J'), 1.3558179483314, 1e-12)
  near(convert('power', 1, 'hp', 'W'), 745.69987158227, 1e-12)
  near(convert('power', 1, 'PS', 'W'), 735.49875, 1e-12)
  near(convert('power', 1, 'TR', 'kW'), 3.516852842, 1e-9)
  near(convert('force', 1, 'lbf', 'N'), 4.4482216152605, 1e-12)
  near(convert('torque', 1, 'lbf·in', 'N·m'), 0.1129848290276, 1e-12)
})

test('flow, speed, density, angular speed', () => {
  near(convert('flow', 1, 'gpm', 'L/min'), 3.785411784, 1e-12)
  near(convert('flow', 1, 'cfm', 'm³/h'), 1.69901079552, 1e-11)
  near(convert('speed', 1, 'knot', 'mph'), 1.150779448, 1e-9)
  near(convert('speed', 60, 'mph', 'km/h'), 96.56064, 1e-12)
  near(convert('density', 1, 'lb/ft³', 'kg/m³'), 16.01846337396, 1e-11)
  near(convert('angular', 1, 'rpm', 'rad/s'), Math.PI / 30, 1e-14)
})

test('every unit converts to itself and round-trips', () => {
  for (const [cat, units] of Object.entries(UNITS)) for (const a of Object.keys(units)) for (const b of Object.keys(units))
    near(convert(cat, convert(cat, 3.7, a, b), b, a), 3.7, 1e-12)
})

test('text input the way people type it', () => {
  const r = convertText('30 psi to bar')
  assert.equal(r.from, 'psi'); assert.equal(r.to, 'bar'); near(r.result, 2.0684271879504, 1e-11)
  near(convertText('500 lpm in gpm').result, 500 / 3.785411784, 1e-12)
  near(convertText('100 ft lbs to nm').result, 135.58179483314, 1e-12)
  near(convertText('1,000 kg/cm2 -> MPa').result, 98.0665, 1e-12)
  assert.equal(convertText('5 psi to mph'), null)
  assert.equal(findUnit('furlong'), null)
})

test('bad input gives NaN, never a wrong number', () => {
  assert.ok(Number.isNaN(convert('pressure', 1, 'psi', 'furlong')))
  assert.ok(Number.isNaN(convert('nope', 1, 'a', 'b')))
  assert.ok(Number.isNaN(convert('pressure', Infinity, 'psi', 'bar')))
})
