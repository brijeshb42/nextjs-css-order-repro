import PD, { type GetPropDefTypes } from './prop-def';

const flexShrinkValues = ['0', '1'] as const;
const flexGrowValues = ['0', '1'] as const;
const alignSelfValues = ['baseline', 'center', 'end', 'start', 'stretch'] as const;

const flexChildPropDefs = {
  flexBasis: PD.String({
    className: 'joy-fb',
    customProperties: ['--fb'],
    responsive: true,
  }),
  flexShrink: PD.EnumOrString({
    className: 'joy-fs',
    customProperties: ['--fs'],
    values: flexShrinkValues,
    responsive: true,
  }),
  flexGrow: PD.EnumOrString({
    className: 'joy-fg',
    customProperties: ['--fg'],
    values: flexGrowValues,
    responsive: true,
  }),
  alignSelf: PD.Enum({
    className: 'joy-as',
    values: alignSelfValues,
    responsive: true,
  }),
};

type FlexChildProps = GetPropDefTypes<typeof flexChildPropDefs>;

export { flexChildPropDefs };
export type { FlexChildProps };
