import { spaceScale } from './prop-def';

import PD, { type GetPropDefTypes } from './prop-def';

const heightPropDefs = {
  height: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-h',
    customProperties: ['--h'],
    responsive: true,
  }),
  minHeight: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-min-h',
    customProperties: ['--min-h'],
    responsive: true,
  }),
  maxHeight: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-max-h',
    customProperties: ['--max-h'],
    responsive: true,
  }),
};

type HeightProps = GetPropDefTypes<typeof heightPropDefs>;

export { heightPropDefs };
export type { HeightProps };
