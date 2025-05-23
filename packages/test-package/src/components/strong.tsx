import * as React from 'react';
import cx from 'clsx';

import { extractProps } from '../helpers/extract-props';

import type { GetPropDefTypes } from '../props/prop-def';

import './strong.css';

/**
 * Props
 */

const strongPropDefs = {};

/**
 * Types
 */

type StrongElement = React.ComponentRef<'strong'>;
type StrongOwnProps = GetPropDefTypes<typeof strongPropDefs>;
interface StrongProps
  extends Omit<React.ComponentPropsWithRef<'strong'>, 'color'>,
    StrongOwnProps {}

/**
 * Component
 */

const Strong = React.forwardRef<StrongElement, StrongProps>((strongProps, forwardedRef) => {
  const props = extractProps(strongProps, strongPropDefs);

  return <strong {...props} ref={forwardedRef} className={cx('joy-Strong', props.className)} />;
});

export { Strong };
export type { StrongProps };
