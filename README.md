# engineering-units

Engineering unit conversion from exact definitions, in plain JavaScript with zero
dependencies. It covers the units engineers actually meet, including the ones general
converters handle loosely: ksi, kgf/cm², inches of water, horsepower vs metric
horsepower, BTU/h, refrigeration tons, gpm and cfm. It also reads text the way people
type it.

```sh
npm install engineering-units
```

```js
import { convert, convertText } from 'engineering-units'

convert('pressure', 30, 'psi', 'bar')   // 2.0684271879505
convert('power', 1, 'TR', 'kW')         // 3.5168528420667 (one ton of refrigeration)
convert('flow', 500, 'L/min', 'gpm')    // 132.08602617907

convertText('100 ft lbs to nm')         // { value: 100, from: 'lbf·ft', to: 'N·m', category: 'torque', result: 135.58179483314 }
convertText('1,000 kg/cm2 -> MPa')      // result: 98.0665
convertText('5 psi to mph')             // null: different kinds of quantity
```

`convert` returns `NaN` for an unknown unit or a non-finite value, never a number that
looks right and is not. `findUnit` maps spellings such as "lpm", "ft lbs", "kg/cm2",
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

**Pressure** (SI unit: Pa)

| Unit | In Pa |
|---|---|
| Pa | 1 |
| kPa | 1000 |
| MPa | 1000000 |
| GPa | 1000000000 |
| bar | 100000 |
| mbar | 100 |
| atm | 101325 |
| psi | 6894.75729317 |
| ksi | 6894757.29317 |
| mmHg | 133.322387415 |
| Torr | 133.322368421 |
| inH2O | 249.08891 |
| kgf/cm² | 98066.5 |

**Energy** (SI unit: J)

| Unit | In J |
|---|---|
| J | 1 |
| kJ | 1000 |
| MJ | 1000000 |
| cal | 4.184 |
| kcal | 4184 |
| Wh | 3600 |
| kWh | 3600000 |
| BTU | 1055.05585262 |
| ft·lbf | 1.35581794833 |

**Power** (SI unit: W)

| Unit | In W |
|---|---|
| W | 1 |
| kW | 1000 |
| MW | 1000000 |
| hp | 745.699871582 |
| PS | 735.49875 |
| BTU/h | 0.293071070172 |
| TR | 3516.85284207 |

**Force** (SI unit: N)

| Unit | In N |
|---|---|
| N | 1 |
| kN | 1000 |
| kgf | 9.80665 |
| lbf | 4.44822161526 |

**Torque** (SI unit: N·m)

| Unit | In N·m |
|---|---|
| N·m | 1 |
| kN·m | 1000 |
| kgf·m | 9.80665 |
| lbf·ft | 1.35581794833 |
| lbf·in | 0.112984829028 |

**Flow rate** (SI unit: m³/s)

| Unit | In m³/s |
|---|---|
| m³/s | 1 |
| m³/h | 0.000277777777778 |
| L/s | 0.001 |
| L/min | 0.0000166666666667 |
| gpm | 0.0000630901964 |
| cfm | 0.0004719474432 |

**Speed** (SI unit: m/s)

| Unit | In m/s |
|---|---|
| m/s | 1 |
| km/h | 0.277777777778 |
| mph | 0.44704 |
| knot | 0.514444444444 |
| ft/s | 0.3048 |

**Density** (SI unit: kg/m³)

| Unit | In kg/m³ |
|---|---|
| kg/m³ | 1 |
| g/cm³ | 1000 |
| lb/ft³ | 16.018463374 |
| lb/in³ | 27679.9047102 |

**Angular speed** (SI unit: rad/s)

| Unit | In rad/s |
|---|---|
| rad/s | 1 |
| rpm | 0.10471975512 |
| rev/s | 6.28318530718 |
| deg/s | 0.0174532925199 |

## Conversion pages

Each common pair has a page with the answer, a live converter, the formula and a
table, built on this library at taueng.com: [psi to bar](https://taueng.com/en/tools/convert/psi-to-bar/), [bar to psi](https://taueng.com/en/tools/convert/bar-to-psi/), [MPa to ksi](https://taueng.com/en/tools/convert/mpa-to-ksi/), [ksi to MPa](https://taueng.com/en/tools/convert/ksi-to-mpa/), [psi to MPa](https://taueng.com/en/tools/convert/psi-to-mpa/), [N·m to lbf·ft](https://taueng.com/en/tools/convert/nm-to-lbf-ft/), [kW to hp](https://taueng.com/en/tools/convert/kw-to-hp/), [kW to BTU/h](https://taueng.com/en/tools/convert/kw-to-btu-h/), [L/min to gpm](https://taueng.com/en/tools/convert/lpm-to-gpm/), [m³/h to cfm](https://taueng.com/en/tools/convert/m3-h-to-cfm/), [knots to mph](https://taueng.com/en/tools/convert/knots-to-mph/), [kg/m³ to lb/ft³](https://taueng.com/en/tools/convert/kg-m3-to-lb-ft3/), [rpm to rad/s](https://taueng.com/en/tools/convert/rpm-to-rad-s/), [kW to refrigeration tons](https://taueng.com/en/tools/convert/kw-to-refrigeration-tons/),
and the full [engineering unit converter](https://taueng.com/en/tools/units/).

## Author

[David Mashiah](https://davidmashiah.com). Also by the same author:
[engineering-tables](https://github.com/davidmashiah/engineering-tables), steam tables
(IAPWS-IF97) and statistical tables. MIT licensed.
