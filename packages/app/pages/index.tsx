import Typography from '@mui/material/Typography';

/**
 * Application Home
 */
export default function Home(): JSX.Element {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100svh',
          flexDirection: 'column',
        }}
      >
        <Typography component='h1' sx={{ typography: { xs: 'h4', sm: 'h3', md: 'h2' } }}>
          Start Development
        </Typography>
      </div>
    </>
  );
}
