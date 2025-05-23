import PD, { spaceScaleWithNegativeValues, type GetPropDefTypes } from './prop-def';

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;

const positionPropDefs = {
  position: PD.Enum({
    className: 'joy-pos',
    values: positionValues,
    responsive: true,
  }),
  inset: PD.EnumOrString({
    className: 'joy-i',
    customProperties: ['--i'],
    values: spaceScaleWithNegativeValues,
    responsive: true,
  }),
  top: PD.EnumOrString({
    className: 'joy-t',
    customProperties: ['--t'],
    values: spaceScaleWithNegativeValues,
    responsive: true,
  }),
  right: PD.EnumOrString({
    className: 'joy-r',
    customProperties: ['--r'],
    values: spaceScaleWithNegativeValues,
    responsive: true,
  }),
  bottom: PD.EnumOrString({
    className: 'joy-b',
    customProperties: ['--b'],
    values: spaceScaleWithNegativeValues,
    responsive: true,
  }),
  left: PD.EnumOrString({
    className: 'joy-l',
    customProperties: ['--l'],
    values: spaceScaleWithNegativeValues,
    responsive: true,
  }),
};

type PositionProps = GetPropDefTypes<typeof positionPropDefs>;

export { positionPropDefs };
export type { PositionProps };
