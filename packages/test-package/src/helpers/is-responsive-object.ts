/**
 * Based on Radix Themes
 * @source https://github.com/radix-ui/themes
 */

import { breakpoints } from '../props/prop-def';

import type { Responsive, Breakpoint } from '../props/prop-def';

export function isResponsiveObject<Value extends string>(
  value: Responsive<Value | Omit<string, Value>> | undefined,
): value is Record<Breakpoint, string> {
  if (typeof value !== 'object') {
    return false;
  }
  for (let i = 0; i < breakpoints.length; i += 1) {
    if (breakpoints[i] in value) {
      return true;
    }
  }
  return false;
}
