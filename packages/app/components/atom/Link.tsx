import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { UrlObject } from 'url';

interface LinkProps {
  href: string | UrlObject;
  children: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top';
  style?: React.CSSProperties;
}

/**
 * Next.js Link component with MUI Link component
 */
export default function Link(props: LinkProps): JSX.Element {
  return (
    <NextLink href={props.href} passHref style={{ ...props.style, textDecoration: 'none' }}>
      <MuiLink component={'span'} target={props.target} rel={props.target ? 'noopener noreferrer' : undefined}>
        {props.children}
      </MuiLink>
    </NextLink>
  );
}
