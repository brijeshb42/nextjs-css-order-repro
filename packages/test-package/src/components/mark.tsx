import * as React from 'react';
import cx from 'clsx';

import { extractProps } from '../helpers/extract-props';

import PD, { type GetPropDefTypes } from '../props/prop-def';

import './mark.css';

/**
 * Props
 */

const variantValues = ['filled', 'text'] as const;

const markPropDefs = {
  variant: PD.Enum({
    className: 'variant',
    values: variantValues,
    default: 'filled',
  }),
};

/**
 * Types
 */

type MarkElement = React.ComponentRef<'mark'>;
type MarkOwnProps = GetPropDefTypes<typeof markPropDefs>;
interface MarkProps extends Omit<React.ComponentPropsWithRef<'mark'>, 'color'>, MarkOwnProps {}

/**
 * Component
 */

const Mark = React.forwardRef<MarkElement, MarkProps>((markProps, forwardedRef) => {
  const props = extractProps(markProps, markPropDefs);

  return <mark {...props} ref={forwardedRef} className={cx('joy-Mark', props.className)} />;
});

export { Mark };
export type { MarkProps };
