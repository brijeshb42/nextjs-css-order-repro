import * as React from 'react';
import cx from 'clsx';

import { extractProps } from '../helpers/extract-props';
import { mergePropDefs } from '../helpers/merge-prop-defs';
import { marginPropDefs } from '../props/margin';
import { paddingPropDefs } from '../props/padding';
import { widthPropDefs } from '../props/width';
import { heightPropDefs } from '../props/height';
import { positionPropDefs } from '../props/position';
import { overflowPropDefs } from '../props/overflow';
import { flexChildPropDefs } from '../props/flex-child';
import { gridChildPropDefs } from '../props/grid-child';
import { gapPropDefs } from '../props/gap';

import PD, { type GetPropDefTypes } from '../props/prop-def';

import './flex.css';

/**
 * Props
 */

const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const alignValues = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
const justifyValues = ['center', 'end', 'start', 'around', 'between', 'evenly'] as const;
const alignContentValues = [
  'center',
  'end',
  'normal',
  'start',
  'around',
  'between',
  'evenly',
  'stretch',
] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;

const ownPropDefs = {
  display: PD.Enum({
    className: 'joy-d',
    values: displayValues,
    responsive: true,
  }),
  direction: PD.Enum({
    className: 'joy-fd',
    values: directionValues,
    responsive: true,
  }),
  align: PD.Enum({
    className: 'joy-ai',
    values: alignValues,
    responsive: true,
  }),
  justify: PD.Enum({
    className: 'joy-jc',
    values: justifyValues,
    parseValue: parseAlignmentValue,
    responsive: true,
  }),
  alignContent: PD.Enum({
    className: 'joy-ac',
    values: alignContentValues,
    parseValue: parseAlignmentValue,
    responsive: true,
  }),
  wrap: PD.Enum({
    className: 'joy-fw',
    values: wrapValues,
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
  gapPropDefs,
]);

function parseAlignmentValue(value: string) {
  switch (value) {
    case 'around':
      return 'space-around';
    case 'between':
      return 'space-between';
    case 'evenly':
      return 'space-evenly';
    default:
      return value;
  }
}

/*
 * Types
 */

type FlexElement = React.ComponentRef<'div'>;
interface FlexProps extends React.ComponentPropsWithRef<'div'>, GetPropDefTypes<typeof propDefs> {}

/*
 * Component
 */

const Flex = React.forwardRef<FlexElement, FlexProps>((flexProps, forwardedRef) => {
  const props = extractProps(flexProps, propDefs);

  return <div {...props} ref={forwardedRef} className={cx('joy-Flex', props.className)} />;
});

export { Flex };
export type { FlexProps };
