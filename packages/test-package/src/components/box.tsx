import * as React from 'react';

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

import './box.css';

/**
 * Props
 */

const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

const ownPropDefs = {
  display: PD.Enum({
    className: 'joy-d',
    values: displayValues,
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

type BoxElement = React.ComponentRef<'div'>;
interface BoxProps extends React.ComponentPropsWithRef<'div'>, GetPropDefTypes<typeof propDefs> {}

/**
 * Component
 */

const Box = React.forwardRef<BoxElement, BoxProps>((boxProps, forwardedRef) => {
  const props = extractProps(boxProps, propDefs);
  return <div {...props} ref={forwardedRef} />;
});

export { Box };
export type { BoxProps };
