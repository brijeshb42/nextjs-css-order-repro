/**
 * Based on Radix Themes
 * @source https://github.com/radix-ui/themes
 */

import type * as React from 'react';

// Creates a union type of string literals with strings, but retains intellisense for the literals.
// Union<string, 'foo' | 'bar'> => string | Omit<string, 'foo' | 'bar'>
type Union<S = string, T extends string | number = string> = T | Omit<S, T>;

// IMPORTANT: Keep in sync with breakpoints.css
const breakpoints = ['initial', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

// IMPORTANT: Keep in sync with utilities
const spaceScale = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;
const spaceScaleWithNegativeValues = [
  ...spaceScale,
  '-1',
  '-2',
  '-3',
  '-4',
  '-5',
  '-6',
  '-7',
  '-8',
  '-9',
  '-10',
] as const;

type Breakpoint = (typeof breakpoints)[number];
type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

type BooleanPropDef = {
  type: 'boolean';
  default?: boolean;
  required?: boolean;
  className?: string;
};
type StringPropDef = {
  type: 'string';
  default?: string;
  required?: boolean;
};
type ReactNodePropDef = {
  type: 'ReactNode';
  default?: React.ReactNode;
  required?: boolean;
};
type EnumPropDef<T> = {
  type: 'enum';
  values: readonly T[];
  default?: T;
  required?: boolean;
};
type EnumOrStringPropDef<T> = {
  type: 'enum | string';
  values: readonly T[];
  default?: T | string;
  required?: boolean;
};

type NonStylingPropDef = {
  className?: never;
  customProperties?: never;
  parseValue?: never;
};

type StylingPropDef = {
  className: string;
  parseValue?: (value: string) => string | undefined;
};

type ArbitraryStylingPropDef = {
  className: string;
  customProperties: readonly `--${string}`[];
  parseValue?: (value: string) => string | undefined;
};

type AnyStringPropDef =
  | (StringPropDef & ArbitraryStylingPropDef)
  | (StringPropDef & NonStylingPropDef);

type AnyEnumPropDef<T> = (EnumPropDef<T> & StylingPropDef) | (EnumPropDef<T> & NonStylingPropDef);

type AnyEnumOrStringPropDef<T> =
  | (EnumOrStringPropDef<T> & ArbitraryStylingPropDef)
  | (EnumOrStringPropDef<T> & NonStylingPropDef);

type RegularPropDef<T> =
  | ReactNodePropDef
  | BooleanPropDef
  | AnyStringPropDef
  | AnyEnumPropDef<T>
  | AnyEnumOrStringPropDef<T>;
type ResponsivePropDef<T = any> = RegularPropDef<T> & { responsive: true };
type PropDef<T = any> = RegularPropDef<T> | ResponsivePropDef<T>;

type PropDefs = Record<string, PropDef>;

// prettier-ignore
type GetPropDefType<Def> = Def extends BooleanPropDef
  ? Def extends ResponsivePropDef
    ? Responsive<boolean>
    : boolean
  : Def extends StringPropDef
    ? Def extends ResponsivePropDef
      ? Responsive<string>
      : string
    : Def extends ReactNodePropDef
      ? Def extends ResponsivePropDef
        ? Responsive<React.ReactNode>
        : React.ReactNode
      : Def extends EnumOrStringPropDef<infer Type>
        ? Def extends ResponsivePropDef<infer ResponsiveType extends string>
          ? Responsive<Union<string, ResponsiveType>>
          : Type
        : Def extends EnumPropDef<infer Type>
          ? Def extends ResponsivePropDef<infer DefType>
            ? Responsive<DefType>
            : Type
          : never;

type GetPropDefTypes<P> = {
  [K in keyof P]?: GetPropDefType<P[K]>;
};

/*
 * Builder functions
 */

const builders = {
  Boolean<const P extends Omit<BooleanPropDef, 'type'>>(params: P) {
    return {
      type: 'boolean' as const,
      ...params,
    };
  },
  String<const P extends Omit<AnyStringPropDef, 'type'>>(params: P) {
    return {
      type: 'string' as const,
      ...params,
    };
  },
  ReactNode<const P extends Omit<ReactNodePropDef, 'type'>>(params: P) {
    return {
      type: 'ReactNode' as const,
      ...params,
    };
  },
  Enum<const T, const P extends Omit<AnyEnumPropDef<T>, 'type'>>(params: P) {
    return {
      type: 'enum' as const,
      ...params,
    };
  },
  EnumOrString<const T, const P extends Omit<AnyEnumOrStringPropDef<T>, 'type'>>(params: P) {
    return {
      type: 'enum | string' as const,
      ...params,
    };
  },
};

// IMPORTANT: Keep in sync with utilities

export default builders;
export { breakpoints, spaceScale, spaceScaleWithNegativeValues };
export type {
  PropDef,
  PropDefs,
  GetPropDefTypes,
  ResponsivePropDef,
  //
  Breakpoint,
  Responsive,
  Union,
};
