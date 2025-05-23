import * as React from 'react';
import cx from 'clsx';

import { extractProps } from '../helpers/extract-props';

import type { GetPropDefTypes } from '../props/prop-def';

import './em.css';

/**
 * Props
 */

const emPropDefs = {};

/**
 * Types
 */

type EmElement = React.ComponentRef<'span'>;
type EmOwnProps = GetPropDefTypes<typeof emPropDefs>;
interface EmProps extends Omit<React.ComponentPropsWithRef<'span'>, 'color'>, EmOwnProps {}

/**
 * Component
 */

const Em = React.forwardRef<EmElement, EmProps>((emProps, forwardedRef) => {
  const props = extractProps(emProps, emPropDefs);

  return <span {...props} ref={forwardedRef} className={cx('joy-Em', props.className)} />;
});

export { Em };
export type { EmProps };
