import PD, { type GetPropDefTypes } from './prop-def';

const gridChildPropDefs = {
  gridColumnStart: PD.String({
    className: 'joy-gcs',
    customProperties: ['--gcs'],
    responsive: true,
  }),
  gridColumnEnd: PD.String({
    className: 'joy-gce',
    customProperties: ['--gce'],
    responsive: true,
  }),
  gridRowStart: PD.String({
    className: 'joy-grs',
    customProperties: ['--grs'],
    responsive: true,
  }),
  gridRowEnd: PD.String({
    className: 'joy-gre',
    customProperties: ['--gre'],
    responsive: true,
  }),
};

type GridChildProps = GetPropDefTypes<typeof gridChildPropDefs>;

export { gridChildPropDefs };
export type { GridChildProps };
