import * as React from 'react';
import cx from 'clsx';

import { PreviewCard as BPreviewCard } from '@base-ui-components/react/preview-card';

import PD, { type GetPropDefTypes } from '../props/prop-def';
import { ThemeProvider } from './theme-provider';
import { mergePropDefs } from '../helpers/merge-prop-defs';
import { extractProps } from '../helpers/extract-props';
import { widthPropDefs } from '../props/width';
import { heightPropDefs } from '../props/height';

import './preview-card.css';

const sizeValues = ['1', '2', '3'] as const;

const PreviewCardRoot = BPreviewCard.Root;

const popupOwnPropDefs = {
  size: PD.Enum({
    className: 'size',
    values: sizeValues,
    default: '2',
    responsive: true,
  }),
};

const popupPropDefs = mergePropDefs([popupOwnPropDefs, widthPropDefs, heightPropDefs]);

type PreviewCardPopupProps = GetPropDefTypes<typeof popupPropDefs> &
  Omit<BPreviewCard.Popup.Props, 'className'> & {
    className?: string;
  };

function PreviewCardPopup(popupProps: PreviewCardPopupProps) {
  const props = extractProps(popupProps, popupPropDefs);
  return (
    <BPreviewCard.Portal>
      <ThemeProvider>
        <BPreviewCard.Positioner sideOffset={4} align="start">
          <BPreviewCard.Popup {...props} className={cx('joy-PreviewCardPopup', props.className)} />
        </BPreviewCard.Positioner>
      </ThemeProvider>
    </BPreviewCard.Portal>
  );
}

const PreviewCardTrigger = BPreviewCard.Trigger;

export { PreviewCardRoot as Root, PreviewCardPopup as Popup, PreviewCardTrigger as Trigger };
