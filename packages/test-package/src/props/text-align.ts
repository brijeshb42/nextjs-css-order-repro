import PD from './prop-def';

const textAlignValues = ['left', 'center', 'right'] as const;

const textAlignPropDef = {
  align: PD.Enum({
    className: 'joy-ta',
    values: textAlignValues,
    responsive: true,
  }),
};

export { textAlignPropDef };
