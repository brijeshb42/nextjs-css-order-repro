import PD from './prop-def';

const textWrapValues = ['wrap', 'nowrap', 'pretty', 'balance'] as const;

const textWrapPropDef = {
  wrap: PD.Enum({
    className: 'joy-tw',
    values: textWrapValues,
    responsive: true,
  }),
};

export { textWrapPropDef };
