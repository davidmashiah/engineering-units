export type Category = 'pressure' | 'energy' | 'power' | 'force' | 'torque' | 'flow' | 'speed' | 'density' | 'angular'
/** Value of each unit in the SI unit of its category (Pa, J, W, N, N·m, m³/s, m/s, kg/m³, rad/s). */
export const UNITS: Record<Category, Record<string, number>>
/** Convert value between two units of one category. NaN for an unknown unit or a non-finite value. */
export function convert(category: Category, value: number, from: string, to: string): number
/** The category and canonical name of a unit as people write it ("ft lbs", "kg/cm2", "lpm"), or null. */
export function findUnit(name: string): { category: Category; unit: string } | null
/** Convert a phrase like "30 psi to bar". Null if unreadable or the units measure different things. */
export function convertText(text: string): { value: number; from: string; to: string; category: Category; result: number } | null
