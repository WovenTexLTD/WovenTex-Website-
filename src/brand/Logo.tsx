import React from 'react';

type LogoProps = {
  /** `mark` is the WT monogram alone; `lockup` includes the rule and LIMITED */
  variant?: 'mark' | 'lockup';
  className?: string;
} & React.ComponentPropsWithoutRef<'span'>;

/**
 * The WT mark is painted with a CSS mask, so it takes `currentColor`,
 * one asset works on paper, on ink, and in signal yellow.
 */
export default function Logo({ variant = 'mark', className = '', ...rest }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="WovenTex LTD"
      {...rest}
      className={`${variant === 'mark' ? 'wt-mark' : 'wt-lockup'} ${className}`}
    />
  );
}
