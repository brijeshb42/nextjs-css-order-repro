import cx from 'clsx';
import { mergeStyles } from './merge-styles';

const breakpoints = ['initial', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
type Breakpoint = (typeof breakpoints)[number];
type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

type Space = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
type SpaceWithNegativeValues =
  | Space
  | ('-1' | '-2' | '-3' | '-4' | '-5' | '-6' | '-7' | '-8' | '-9' | '-10');

// Creates a union type of string with string literals and retains intellisense for the literals.
// StringUnion<string, 'a' | 'b'> => string | Omit<string, 'a' | 'bar'>
type StringUnion<T extends string | number = string, S = string> = T | Omit<S, T>;

const PREFIX = 'joy-';

const stylePropToClassNameMap = {
  display: 'd',

  p: 'p',
  px: 'px',
  py: 'py',
  pt: 'pt',
  pr: 'pr',
  pb: 'pb',
  pl: 'pl',

  m: 'm',
  mx: 'mx',
  my: 'my',
  mt: 'mt',
  mr: 'mr',
  mb: 'mb',
  ml: 'ml',

  width: 'w',
  minWidth: 'min-w',
  maxWidth: 'max-w',
  height: 'h',
  minHeight: 'min-h',
  maxHeight: 'max-h',

  position: 'pos',
  inset: 'i',
  top: 't',
  right: 'r',
  bottom: 'b',
  left: 'l',

  overflow: 'o',
  overflowX: 'ox',
  overflowY: 'oy',

  flexBasis: 'fb',
  flexShrink: 'fs',
  flexGrow: 'fg',

  gap: 'g',
  gapX: 'rg',
  gapY: 'cg',
  direction: 'fd',
  align: 'ai',
  justify: 'jc',
  content: 'ac',
  wrap: 'w',
};

const propValueToCssValueMap: Record<string, Record<string, string>> = {
  justify: {
    around: 'space-around',
    between: 'space-between',
    evenly: 'space-evenly',
  },
  content: {
    around: 'space-around',
    between: 'space-between',
    evenly: 'space-evenly',
  },
};

function generateUtilityClassName(
  propName: keyof typeof stylePropToClassNameMap,
  value: string | number,
) {
  if (!stylePropToClassNameMap[propName]) {
    throw new Error(`No class name mapping found for ${propName}`);
  }

  return `${PREFIX}${stylePropToClassNameMap[propName]}-${
    propValueToCssValueMap[propName]?.[value] || value
  }`;
}

/**
 * Takes props and returns an object with className, style, and the rest
 * of the props that weren't used to generate className and style.
 *
 * TODO: Handle responsive values.
 * TODO: Handle predefined values and arbitrary values separately.
 */
function extractStyleProps<
  P extends { className?: string; style?: React.CSSProperties; [key: string]: any },
>(props: P) {
  const forwardedProps = { ...props };
  let className: string | undefined;
  let style: ReturnType<typeof mergeStyles>;

  for (const key in props) {
    if (props.hasOwnProperty(key) && key in stylePropToClassNameMap && props[key] !== '') {
      const value = props[key];

      className = cx(
        className,
        generateUtilityClassName(key as keyof typeof stylePropToClassNameMap, value),
      );

      delete forwardedProps[key];
    }
  }

  forwardedProps.className = cx(className, props.className);
  forwardedProps.style = mergeStyles(style, props.style);

  return forwardedProps;
}

export { breakpoints, extractStyleProps };
export type { Responsive, StringUnion, Space, SpaceWithNegativeValues };
