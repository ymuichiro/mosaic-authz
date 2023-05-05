import { createTheme } from '@mui/material/styles';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    mode: 'dark',
    neutral: {
      main: '#FFF',
      light: '#FFF',
      dark: '#72f7ff',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'normal',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: '8px',
        },
      },
      defaultProps: {
        variant: 'standard',
        fullWidth: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard',
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#27c5f3',
          textDecoration: 'none',
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'error' },
          style: {
            border: 'solid 2px',
            borderColor: '#D32F2F',
            borderWidth: '3px',
            background: 'rgba(255,0,0,0.1)',
          },
        },
      ],
    },
  },
});

export default theme;
