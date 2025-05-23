import type { PropDefs } from '../props/prop-def';

/*
 * Annotating the type as multiple declarations is less computationally expensive for
 * typescript than declaring a recursive type.
 */

export function mergePropDefs<A, B>(propDefs: [A, B]): A & B;
export function mergePropDefs<A, B, C>(propDefs: [A, B, C]): A & B & C;
export function mergePropDefs<A, B, C, D>(propDefs: [A, B, C, D]): A & B & C & D;
export function mergePropDefs<A, B, C, D, E>(propDefs: [A, B, C, D, E]): A & B & C & D & E;
export function mergePropDefs<A, B, C, D, E, F>(
  propDefs: [A, B, C, D, E, F],
): A & B & C & D & E & F;
export function mergePropDefs<A, B, C, D, E, F, G>(
  propDefs: [A, B, C, D, E, F, G],
): A & B & C & D & E & F & G;
export function mergePropDefs<A, B, C, D, E, F, G, H>(
  propDefs: [A, B, C, D, E, F, G, H],
): A & B & C & D & E & F & G & H;
export function mergePropDefs<A, B, C, D, E, F, G, H, I>(
  propDefs: [A, B, C, D, E, F, G, H, I],
): A & B & C & D & E & F & G & H & I;
export function mergePropDefs<A, B, C, D, E, F, G, H, I, J>(
  propDefs: [A, B, C, D, E, F, G, H, I, J],
): A & B & C & D & E & F & G & H & I & J;
export function mergePropDefs<A, B, C, D, E, F, G, H, I, J, K>(
  propDefs: [A, B, C, D, E, F, G, H, I, J, K],
): A & B & C & D & E & F & G & H & I & J & K;
export function mergePropDefs<A, B, C, D, E, F, G, H, I, J, K, L>(
  propDefs: [A, B, C, D, E, F, G, H, I, J, K, L],
): A & B & C & D & E & F & G & H & I & J & K & L;
export function mergePropDefs<T extends PropDefs[]>(propDefs: T): unknown {
  return Object.assign({}, ...propDefs);
}
