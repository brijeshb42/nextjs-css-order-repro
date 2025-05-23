import { spaceScaleWithNegativeValues } from './prop-def';

import PD, { type GetPropDefTypes } from './prop-def';

const marginPropDefs = {
  m: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-m',
    customProperties: ['--m'],
    responsive: true,
  }),
  mx: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-mx',
    customProperties: ['--ml', '--mr'],
    responsive: true,
  }),
  my: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-my',
    customProperties: ['--mt', '--mb'],
    responsive: true,
  }),
  mt: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-mt',
    customProperties: ['--mt'],
    responsive: true,
  }),
  mr: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-mr',
    customProperties: ['--mr'],
    responsive: true,
  }),
  mb: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-mb',
    customProperties: ['--mb'],
    responsive: true,
  }),
  ml: PD.EnumOrString({
    values: spaceScaleWithNegativeValues,
    className: 'joy-ml',
    customProperties: ['--ml'],
    responsive: true,
  }),
};

type MarginProps = GetPropDefTypes<typeof marginPropDefs>;

export { marginPropDefs };
export type { MarginProps };
