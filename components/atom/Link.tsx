import MuiLink from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  return (
    <NextLink
      href={props.href}
      passHref
      target={props.target}
      rel={props.target ? 'noopener noreferrer' : undefined}
      style={{ ...props.style, textDecoration: 'none', fontSize: theme.typography.caption.fontSize }}
    >
      <MuiLink component={'span'}>{props.children}</MuiLink>
    </NextLink>
  );
}
