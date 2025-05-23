/**
 * Based on Radix Themes
 * @source https://github.com/radix-ui/themes
 */

import type * as React from 'react';
import cx from 'clsx';

import type { PropDefs } from '../props/prop-def';

import { getResponsiveClassNames, getResponsiveStyles } from './get-responsive-styles';
import { isResponsiveObject } from './is-responsive-object';
import { mergeStyles } from './merge-styles';

type StylingPropDefNames<D> = D extends PropDefs
  ? { [K in keyof D]: D[K] extends { className: string } ? K : never }[keyof D]
  : never;

type ExtractedProps<P, D> = Omit<P, StylingPropDefNames<D>> & {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Takes props, checks them against prop defs that have a `className` on them,
 * adds necessary CSS classes and inline styles, and returns the props without
 * the corresponding prop defs that were used to formulate the new `className`
 * and `style` values. Also applies prop def defaults to every prop.
 */
function extractProps<
  P extends { className?: string; style?: React.CSSProperties; [key: string]: any },
  D extends PropDefs,
>(props: P, propDefs: D): ExtractedProps<P, D> {
  let className = props.className;
  let style = props.style;

  const extractedProps = {} as ExtractedProps<P, D>;

  for (const key in props) {
    if (!propDefs.hasOwnProperty(key)) {
      (extractedProps as Record<string, any>)[key] = props[key];
    }
  }

  for (const key of Object.keys(propDefs)) {
    const propDef = propDefs[key];

    let value = props[key];

    // Apply prop def defaults
    if (propDef.default !== undefined && value === undefined) {
      value = propDef.default;
    }

    const needsExtracting = 'className' in propDef && propDef.className;
    if (!needsExtracting) {
      // Apply the value with defaults
      (extractedProps as Record<string, any>)[key] = value;
      continue;
    }

    if (value === undefined) {
      continue;
    }

    if (isResponsiveObject(value)) {
      // Apply prop def defaults to the `initial` breakpoint
      if (propDef.default !== undefined && value.initial === undefined) {
        value.initial = propDef.default;
      }
    }

    switch (propDef.type) {
      case 'enum': {
        const propClassName = getResponsiveClassNames({
          allowArbitraryValues: false,
          value,
          className: propDef.className,
          propValues: propDef.values,
          parseValue: propDef.parseValue,
        });

        className = cx(className, propClassName);
        break;
      }

      case 'string':
      case 'enum | string': {
        const propDefValues = propDef.type === 'string' ? [] : propDef.values;

        const [propClassNames, propCustomProperties] = getResponsiveStyles({
          className: propDef.className,
          customProperties: propDef.customProperties,
          propValues: propDefValues,
          parseValue: propDef.parseValue,
          value,
        });

        style = mergeStyles(style, propCustomProperties);
        className = cx(className, propClassNames);
        break;
      }

      case 'boolean': {
        if (value) {
          // TODO handle responsive boolean props
          className = cx(className, propDef.className);
        }
        break;
      }

      default:
        throw new Error(`Unsupported prop type: ${(propDef as any).type}`);
    }
  }

  extractedProps.className = className;
  extractedProps.style = style;

  return extractedProps;
}

export { extractProps };
