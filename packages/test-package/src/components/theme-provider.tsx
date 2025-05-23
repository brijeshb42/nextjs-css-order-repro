'use client';

import * as React from 'react';
import cx from 'clsx';
import { useRender } from '@base-ui-components/react/use-render';
import { mergeProps } from '@base-ui-components/react/merge-props';

import './theme-provider.css';

type ColorScheme = 'light' | 'dark';
type ThemeProviderElement = React.ComponentRef<'div'>;
type ThemeProviderOwnProps = { colorScheme?: ColorScheme };
type ThemeProviderProps = ThemeProviderOwnProps & useRender.ComponentProps<'div'>;
type ThemeProviderContextValue = { colorScheme: ColorScheme };

const DEFAULT_RENDER = <div />;

const ThemeContext = React.createContext<ThemeProviderContextValue | undefined>(undefined);

const ThemeProvider = React.forwardRef<ThemeProviderElement, ThemeProviderProps>(
  (props, forwardedRef) => {
    const context = React.useContext(ThemeContext);
    const {
      colorScheme = context?.colorScheme ?? 'light',
      className,
      render = DEFAULT_RENDER,
      ...rest
    } = props;
    const ctxValue = React.useMemo(() => ({ colorScheme }), [colorScheme]);

    const { renderElement } = useRender({
      render,
      props: mergeProps<'div'>(
        { className: cx('joy', colorScheme === 'dark' && 'dark', className) },
        rest,
      ),
      refs: [forwardedRef],
    });

    return <ThemeContext.Provider value={ctxValue}>{renderElement()}</ThemeContext.Provider>;
  },
);

export { ThemeProvider };
export type { ThemeProviderProps };
