import * as React from 'react';
import cx from 'clsx';

import { ScrollArea as BScrollArea } from '@base-ui-components/react/scroll-area';
import PD, { type GetPropDefTypes } from '../props/prop-def';
import { extractProps } from '../helpers/extract-props';

import './scroll-area.css';

const orientationValues = ['vertical', 'horizontal', 'both'] as const;
const visibilityValues = ['hover', 'always', 'scroll'] as const;

const scrollAreaPropDefs = {
  orientation: PD.Enum({
    values: orientationValues,
    default: 'vertical',
  }),
  visibility: PD.Enum({
    values: visibilityValues,
    default: 'hover',
    className: 'visibility',
  }),
};

type ScrollAreaOwnProps = GetPropDefTypes<typeof scrollAreaPropDefs> & {
  className?: string;
};

export function ScrollArea({
  children,
  orientation = scrollAreaPropDefs.orientation.default,
  tabIndex,
  ...scrollProps
}: Omit<BScrollArea.Root.Props, 'className'> &
  Pick<BScrollArea.Viewport.Props, 'children'> &
  ScrollAreaOwnProps) {
  const props = extractProps(scrollProps, scrollAreaPropDefs);

  return (
    <BScrollArea.Root {...props} className={cx('joy-ScrollAreaRoot', props.className)}>
      <BScrollArea.Viewport className="joy-ScrollAreaViewport" tabIndex={tabIndex}>
        <BScrollArea.Content className="joy-ScrollAreaContent">{children}</BScrollArea.Content>
      </BScrollArea.Viewport>

      {orientation !== 'horizontal' ? (
        <BScrollArea.Scrollbar className="joy-ScrollAreaScrollbar" orientation="vertical">
          <BScrollArea.Thumb className="joy-ScrollAreaThumb" />
        </BScrollArea.Scrollbar>
      ) : null}

      {orientation !== 'vertical' ? (
        <BScrollArea.Scrollbar className="joy-ScrollAreaScrollbar" orientation="horizontal">
          <BScrollArea.Thumb className="joy-ScrollAreaThumb" />
        </BScrollArea.Scrollbar>
      ) : null}

      {orientation === 'both' ? <BScrollArea.Corner className="joy-ScrollAreaCorner" /> : null}
    </BScrollArea.Root>
  );
}
