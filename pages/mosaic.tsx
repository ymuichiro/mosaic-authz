import blockchain from '@/assets/blockchain.json';
import Content from '@/components/atom/Content';
import Link from '@/components/atom/Link';
import { MosaicCheckedContext } from '@/pages/_app';
import { getMosaicInfo, postAuthz } from '@/services/fetcher';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { getActivePublicKey, isAllowedSSS, requestSignEncription, setMessage } from 'sss-module';
import useSWR from 'swr';

const steps = [
  {
    label: 'Install SSS Extention',
    description:
      '\
      Prove that you own the blockchain account that owns the specified Mosaic. \
      This uses SSS, so if you do not have it installed on your current browser, \
      please install it from the following link.\
      ',
    link: 'https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan',
  },
  {
    label: 'Register a Symbol account with SSS Extention',
    description:
      '\
      Register an account with SSS Extention that has the pre-designated Mosaic.\
      To register for an account, please see below.\
      ',
    link: 'https://github.com/SafelySignSymbol/SSS-Extension/wiki/Setting-Guide',
  },
  {
    label: 'Enabling SSS Extention',
    description: 'Please right click in this page. "Link to SSS" and refresh the screen.',
  },
  {
    label: 'Authentication by Mosaic',
    description: 'Verifies accounts registered by SSS Extention.',
  },
];

/**
 * Mosaic Auth
 */
export default function Mosaic(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  const [isEnableSSS, setIsEnableSSS] = React.useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const context = React.useContext(MosaicCheckedContext);
  const { data, isLoading, isValidating, error } = useSWR('admin-public-key', () => getMosaicInfo());

  React.useEffect(() => {
    if (isAllowedSSS()) {
      setIsEnableSSS(true);
    }
  }, []);

  if (error) throw new Error('Failed to retrieve admin public key');
  if (!data || isLoading || isValidating) return <CircularProgress />;

  const handleAuth = async () => {
    const userPublicKey = getActivePublicKey();
    setMessage('Prove me right.', data.adminPublicKey);
    const { payload } = await requestSignEncription();
    try {
      await postAuthz(userPublicKey, payload);
      context.setIsMosaicChecked(true);
      return router.push('/finish');
    } catch (err) {
      console.error(err);
      alert('認証に失敗しました');
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (session.status === 'unauthenticated') {
    router.push('/');
    return <div />;
  } else if (session.status === 'authenticated' && context.isMosaicChecked) {
    router.push('/finish');
    return <div />;
  }

  return (
    <Content>
      <Grid item xs={12} sm={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' } }}>
          <Lottie animationData={blockchain} style={{ height: '300px' }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
            width: '100%',
          }}
        >
          <div>
            <Typography
              variant='caption'
              color='textSecondary'
              gutterBottom
            >{`Mosaic Proof of possession of ${data.mosaicId}`}</Typography>
          </div>

          <Stepper activeStep={activeStep} orientation='vertical' style={{ width: '100%' }}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography variant='caption'>{step.description}</Typography>
                  <br />
                  {step.link ? (
                    <Link href={step.link} target='_blank'>
                      document
                    </Link>
                  ) : null}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      gap: '10px',
                      marginTop: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    <Button
                      variant='contained'
                      onClick={index === steps.length - 1 ? handleAuth : handleNext}
                      style={{ minWidth: '5rem' }}
                      disabled={index === steps.length - 1 && !isEnableSSS}
                    >
                      {index === steps.length - 1 ? 'verification' : 'Continue'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} style={{ minWidth: '5rem' }}>
                      Back
                    </Button>
                  </div>
                  <div>
                    {index === steps.length - 1 && !isEnableSSS && (
                      <Typography color='error' variant='caption' align='center' gutterBottom>
                        SSS Extention is not enabled
                      </Typography>
                    )}
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>
    </Content>
  );
}
