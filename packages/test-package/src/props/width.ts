import PD, { spaceScale, type GetPropDefTypes } from './prop-def';

const widthPropDefs = {
  width: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-w',
    customProperties: ['--w'],
    responsive: true,
  }),
  minWidth: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-min-w',
    customProperties: ['--min-w'],
    responsive: true,
  }),
  maxWidth: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-max-w',
    customProperties: ['--max-w'],
    responsive: true,
  }),
};

type WidthProps = GetPropDefTypes<typeof widthPropDefs>;

export { widthPropDefs };
export type { WidthProps };
