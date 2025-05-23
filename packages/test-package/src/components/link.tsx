'use client';

import * as React from 'react';
import cx from 'clsx';

import { extractProps } from '../helpers/extract-props';
import { Text } from './text';

import PD, { type GetPropDefTypes } from '../props/prop-def';
import type { TextProps } from './text';

import './link.css';

/**
 * Props
 */

const underlineValues = ['always', 'hover', 'none'] as const;

const linkPropDefs = {
  underline: PD.Enum({
    className: 'underline',
    values: underlineValues,
    default: 'always',
  }),
};

/**
 * Types
 */

type LinkElement = React.ComponentRef<'a'>;
type LinkOwnProps = GetPropDefTypes<typeof linkPropDefs> &
  Pick<TextProps, 'render' | 'size' | 'weight' | 'color' | 'wrap'> & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
interface LinkProps extends Omit<React.ComponentPropsWithRef<'a'>, 'color'>, LinkOwnProps {}

/**
 * Component
 */

// eslint-disable-next-line jsx-a11y/anchor-has-content
const DEFAULT_RENDER = <a />;

const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { children, startIcon, endIcon, className, ...rest } = extractProps(props, linkPropDefs);

  return (
    <Text
      color="indigo"
      render={DEFAULT_RENDER}
      {...rest}
      contrast="low"
      ref={forwardedRef}
      className={cx('joy-reset', 'joy-Link', className)}
    >
      {startIcon ? <span className="joy-Link-startIcon">{startIcon}</span> : null}
      {children}
      {endIcon ? <span className="joy-Link-endIcon">{endIcon}</span> : null}
    </Text>
  );
});

export { Link };
export type { LinkProps };
