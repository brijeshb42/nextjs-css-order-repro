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
import { gapPropDefs } from '../props/gap';

import PD, { type GetPropDefTypes } from '../props/prop-def';

import './grid.css';

/**
 * Props
 */

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const rowsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;
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

const ownPropDefs = {
  display: PD.Enum({
    className: 'joy-d',
    values: displayValues,
    responsive: true,
  }),
  columns: PD.EnumOrString({
    className: 'joy-gtc',
    customProperties: ['--grid-template-columns'],
    values: columnsValues,
    parseValue: parseGridValue,
    responsive: true,
  }),
  rows: PD.EnumOrString({
    className: 'joy-gtr',
    customProperties: ['--grid-template-rows'],
    values: rowsValues,
    parseValue: parseGridValue,
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

function parseGridValue(value: string): string {
  if ((ownPropDefs.columns.values as readonly string[]).includes(value)) {
    return value;
  }

  return value?.match(/^\d+$/) ? `repeat(${value}, minmax(0, 1fr))` : value;
}

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

/**
 * Types
 */

type GridElement = React.ComponentRef<'div'>;
interface GridProps extends React.ComponentPropsWithRef<'div'>, GetPropDefTypes<typeof propDefs> {}

/**
 * Component
 */

const Grid = React.forwardRef<GridElement, GridProps>((gridProps, forwardedRef) => {
  const props = extractProps(gridProps, propDefs);

  return <div {...props} ref={forwardedRef} className={cx('joy-Grid', props.className)} />;
});

export { Grid };
export type { GridProps };
