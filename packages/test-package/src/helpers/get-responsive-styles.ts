/**
 * Based on Radix Themes
 * @source https://github.com/radix-ui/themes
 */

import { breakpoints } from '../props/prop-def';
import { hasOwnProperty } from './has-own-property';
import { isResponsiveObject } from './is-responsive-object';

import type { Responsive, Union } from '../props/prop-def';

interface GetResponsiveStylesOptions {
  className: string;
  customProperties: readonly `--${string}`[];
  value: Responsive<Union> | Responsive<string> | undefined;
  propValues: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveStyles({ className, customProperties, ...args }: GetResponsiveStylesOptions) {
  const responsiveClassNames = getResponsiveClassNames({
    allowArbitraryValues: true,
    className,
    ...args,
  });

  const responsiveCustomProperties = getResponsiveCustomProperties({ customProperties, ...args });
  return [responsiveClassNames, responsiveCustomProperties] as const;
}

interface GetResponsiveClassNamesOptions {
  allowArbitraryValues?: boolean;
  className: string;
  value: Responsive<Union> | Responsive<string> | undefined;
  propValues: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveClassNames({
  allowArbitraryValues,
  value,
  className,
  propValues,
  parseValue = (toParseValue) => toParseValue,
}: GetResponsiveClassNamesOptions): string | undefined {
  const classNames: string[] = [];

  if (!value) {
    return undefined;
  }

  if (typeof value === 'string' && propValues.includes(value)) {
    return getBaseClassName(className, value, parseValue);
  }

  if (isResponsiveObject(value)) {
    const object = value;

    for (const bp in object) {
      // Make sure we are not iterating over keys that aren't breakpoints
      if (!hasOwnProperty(object, bp) || !breakpoints.includes(bp)) {
        continue;
      }

      const breakpointValue = object[bp];

      if (breakpointValue !== undefined) {
        if (propValues.includes(breakpointValue)) {
          const baseClassName = getBaseClassName(className, breakpointValue, parseValue);
          const bpClassName = bp === 'initial' ? baseClassName : `${bp}:${baseClassName}`;
          classNames.push(bpClassName);
        } else if (allowArbitraryValues) {
          const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
          classNames.push(bpClassName);
        }
      }
    }

    return classNames.join(' ');
  }

  if (allowArbitraryValues) {
    return className;
  }

  return undefined;
}

function getBaseClassName(
  className: string,
  value: string,
  parseValue: (value: string) => string | undefined,
): string {
  const delimiter = className ? '-' : '';
  const matchedValue = parseValue(value);
  const isNegative = matchedValue?.startsWith('-');
  const minus = isNegative ? '-' : '';
  const absoluteValue = isNegative ? matchedValue?.substring(1) : matchedValue;
  return `${minus}${className}${delimiter}${absoluteValue}`;
}

interface GetResponsiveCustomPropertiesOptions {
  customProperties: readonly `--${string}`[];
  value: Responsive<Union> | Responsive<string> | undefined;
  propValues: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveCustomProperties({
  customProperties,
  value,
  propValues,
  parseValue = (toParseValue) => toParseValue,
}: GetResponsiveCustomPropertiesOptions) {
  let styles: Record<string, string | undefined> = {};

  // Don't generate custom properties if the value is not arbitrary
  if (!value || (typeof value === 'string' && propValues.includes(value))) {
    return undefined;
  }

  if (typeof value === 'string') {
    styles = Object.fromEntries(customProperties.map((prop) => [prop, value]));
  }

  if (isResponsiveObject(value)) {
    const object = value;

    for (const bp in object) {
      // Make sure we are not iterating over keys that aren't breakpoints
      if (!hasOwnProperty(object, bp) || !breakpoints.includes(bp)) {
        continue;
      }

      const responsiveValue = object[bp];

      // Don't generate a custom property if the value is not arbitrary
      if (propValues.includes(responsiveValue)) {
        continue;
      }

      for (const customProperty of customProperties) {
        const bpProperty = bp === 'initial' ? customProperty : `${customProperty}-${bp}`;

        styles = {
          [bpProperty]: responsiveValue,
          ...styles,
        };
      }
    }
  }

  for (const key in styles) {
    if (!styles.hasOwnProperty(key)) {
      continue;
    }

    const styleValue = styles[key];
    if (styleValue !== undefined) {
      styles[key] = parseValue(styleValue);
    }
  }

  return styles;
}

export { getResponsiveStyles, getResponsiveCustomProperties, getResponsiveClassNames };
