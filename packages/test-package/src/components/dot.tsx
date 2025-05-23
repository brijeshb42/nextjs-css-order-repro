import * as React from 'react';
import cx from 'clsx';

import { extractProps } from '../helpers/extract-props';

import PD, { type GetPropDefTypes } from '../props/prop-def';

import './dot.css';

/**
 * Props
 */

const variantValues = ['outlined', 'filled'] as const;
const sizeValues = ['1', '2', '3'] as const;
const colorValues = ['mauve', 'indigo', 'violet', 'cyan', 'jade', 'red'] as const;

const dotPropDefs = {
  variant: PD.Enum({
    className: 'variant',
    values: variantValues,
    default: 'filled',
  }),
  size: PD.Enum({
    className: 'size',
    values: sizeValues,
    default: '2',
  }),
  color: PD.Enum({
    className: 'color',
    values: colorValues,
    default: 'mauve',
  }),
};

/**
 * Types
 */

type DotElement = React.ComponentRef<'span'>;
type DotOwnProps = GetPropDefTypes<typeof dotPropDefs>;
interface DotProps extends Omit<React.ComponentPropsWithRef<'span'>, 'color'>, DotOwnProps {}

/**
 * Component
 */

const Dot = React.forwardRef<DotElement, DotProps>((dotProps, forwardedRef) => {
  const props = extractProps(dotProps, dotPropDefs);

  return <span {...props} ref={forwardedRef} className={cx('joy-Dot', props.className)} />;
});

export { Dot };
export type { DotProps };
