import * as React from 'react';
import cx from 'clsx';

import { mergePropDefs } from '../helpers/merge-prop-defs';
import { extractProps } from '../helpers/extract-props';
import { marginPropDefs } from '../props/margin';
import { paddingPropDefs } from '../props/padding';
import { widthPropDefs } from '../props/width';
import { heightPropDefs } from '../props/height';
import { positionPropDefs } from '../props/position';
import { overflowPropDefs } from '../props/overflow';
import { flexChildPropDefs } from '../props/flex-child';
import { gridChildPropDefs } from '../props/grid-child';

import PD, { type GetPropDefTypes } from '../props/prop-def';

import './container.css';

/**
 * Props
 */

const sizeValues = ['1', '2', '3', '4'] as const;
const displayValues = ['none', 'block'] as const;

const ownPropDefs = {
  display: PD.Enum({
    className: 'joy-d',
    values: displayValues,
    responsive: true,
  }),
  size: PD.Enum({
    className: 'size',
    values: sizeValues,
    default: '4',
    responsive: true,
  }),
};

const propDefs = mergePropDefs([
  ownPropDefs,
  marginPropDefs,
  paddingPropDefs,
  widthPropDefs,
  heightPropDefs,
  positionPropDefs,
  overflowPropDefs,
  flexChildPropDefs,
  gridChildPropDefs,
]);

/**
 * Types
 */

type ContainerElement = React.ComponentRef<'div'>;
interface ContainerProps
  extends React.ComponentPropsWithRef<'div'>,
    GetPropDefTypes<typeof propDefs> {}

/**
 * Component
 */

const Container = React.forwardRef<ContainerElement, ContainerProps>(
  (containerProps, forwardedRef) => {
    const props = extractProps(containerProps, propDefs);

    return <div {...props} ref={forwardedRef} className={cx('joy-Container', props.className)} />;
  },
);

export { Container };
export type { ContainerProps };
