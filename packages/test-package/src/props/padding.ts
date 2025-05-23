import PD, { spaceScale, type GetPropDefTypes } from './prop-def';

const paddingPropDefs = {
  p: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-p',
    customProperties: ['--p'],
    responsive: true,
  }),
  px: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-px',
    customProperties: ['--pl', '--pr'],
    responsive: true,
  }),
  py: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-py',
    customProperties: ['--pt', '--pb'],
    responsive: true,
  }),
  pt: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-pt',
    customProperties: ['--pt'],
    responsive: true,
  }),
  pr: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-pr',
    customProperties: ['--pr'],
    responsive: true,
  }),
  pb: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-pb',
    customProperties: ['--pb'],
    responsive: true,
  }),
  pl: PD.EnumOrString({
    values: spaceScale,
    className: 'joy-pl',
    customProperties: ['--pl'],
    responsive: true,
  }),
};

type PaddingProps = GetPropDefTypes<typeof paddingPropDefs>;

export { paddingPropDefs };
export type { PaddingProps };
