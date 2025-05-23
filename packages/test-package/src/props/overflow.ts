import PD, { type GetPropDefTypes } from './prop-def';

const overflowValues = ['visible', 'hidden', 'clip', 'scroll', 'auto'] as const;

const overflowPropDefs = {
  overflow: PD.Enum({
    className: 'joy-o',
    values: overflowValues,
    responsive: true,
  }),
  overflowX: PD.Enum({
    className: 'joy-ox',
    values: overflowValues,
    responsive: true,
  }),
  overflowY: PD.Enum({
    className: 'joy-oy',
    values: overflowValues,
    responsive: true,
  }),
};

type OverflowProps = GetPropDefTypes<typeof overflowPropDefs>;

export { overflowPropDefs };
export type { OverflowProps };
