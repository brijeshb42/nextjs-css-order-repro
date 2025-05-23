import { spaceScale } from './prop-def';

import PD, { type GetPropDefTypes } from './prop-def';

const gapPropDefs = {
  gap: PD.EnumOrString({
    className: 'joy-g',
    customProperties: ['--g'],
    values: spaceScale,
    responsive: true,
  }),
  gapX: PD.EnumOrString({
    className: 'joy-cg',
    customProperties: ['--cg'],
    values: spaceScale,
    responsive: true,
  }),
  gapY: PD.EnumOrString({
    className: 'joy-rg',
    customProperties: ['--rg'],
    values: spaceScale,
    responsive: true,
  }),
};

type GapProps = GetPropDefTypes<typeof gapPropDefs>;

export { gapPropDefs };
export type { GapProps };
