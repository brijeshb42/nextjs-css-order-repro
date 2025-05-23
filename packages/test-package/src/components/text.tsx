'use client';

import * as React from 'react';
import cx from 'clsx';
import { useRender } from '@base-ui-components/react/use-render';

import { mergePropDefs } from '../helpers/merge-prop-defs';
import { extractProps } from '../helpers/extract-props';
import { textAlignPropDef } from '../props/text-align';
import { textWrapPropDef } from '../props/text-wrap';
import { marginPropDefs } from '../props/margin';

import PD, { type GetPropDefTypes } from '../props/prop-def';

import './text.css';

/**
 * Props
 */

const sizeValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const weightValues = ['1', '2', '3'] as const;
const colorValues = ['mauve', 'indigo', 'violet', 'cyan', 'jade', 'red'] as const;

const ownPropDefs = {
  size: PD.Enum({
    className: 'size',
    values: sizeValues,
  }),
  weight: PD.Enum({
    className: 'weight',
    values: weightValues,
  }),
  color: PD.Enum({
    className: 'color',
    values: colorValues,
  }),
};

const propDefs = mergePropDefs([ownPropDefs, marginPropDefs, textAlignPropDef, textWrapPropDef]);

/**
 * Types
 */

type TextElement = React.ComponentRef<'span'>;
interface TextProps
  extends Omit<useRender.ComponentProps<'span'>, 'color'>,
    GetPropDefTypes<typeof propDefs> {
  // eslint-disable-next-line react/no-unused-prop-types -- it's being used
  contrast?: 'low' | 'high';
}

/**
 * Component
 */

const DEFAULT_RENDER = <span />;

const Text = React.forwardRef<TextElement, TextProps>((textProps, forwardedRef) => {
  const { render = DEFAULT_RENDER, contrast, ...props } = extractProps(textProps, propDefs);

  // TODO: refactor once we have accent, contrast, etc. in place
  let resolvedClassName = props.className;

  if (contrast === 'low') {
    resolvedClassName =
      resolvedClassName?.includes('color-') && !resolvedClassName?.includes('color-low-')
        ? resolvedClassName.replace(`color-`, `color-low-`)
        : resolvedClassName;
  }

  props.className = cx('joy-Text', resolvedClassName);

  const { renderElement } = useRender({
    render,
    props,
    refs: [forwardedRef],
  });

  return renderElement();
});

export { Text };
export type { TextProps };
