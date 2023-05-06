import blockchain from '@/assets/blockchain.json';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import React from 'react';
import { getActivePublicKey, isAllowedSSS, requestSignEncription, setMessage } from 'sss-module';
import useSWR from 'swr';

export default function MosaicAuth(): JSX.Element {
  const [isEnableSSS, setIsEnableSSS] = React.useState<boolean>(false);
  const { data, isLoading, isValidating, error } = useSWR('admin-public-key', () =>
    fetch('/api/publickey').then((res) => res.json())
  );

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
      const res = await fetch('/api/authz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPublicKey, token: payload }),
      });
      if (res.status !== 204) {
        console.error(res);
        alert('認証に失敗しました');
      } else {
        alert('権限付与に成功しました。このページは閉じて下さい');
      }
    } catch (err) {
      console.error(err);
      alert('認証に失敗しました');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100svh',
          flexDirection: 'column',
          gap: '5svh',
        }}
      >
        <Lottie animationData={blockchain} style={{ height: '300px' }} />
        <Button style={{ maxWidth: '300px' }} fullWidth disabled={!isEnableSSS} onClick={handleAuth}>
          Wallet Auth
        </Button>
        {!isEnableSSS && (
          <Typography color='error' variant='caption' align='center' gutterBottom>
            SSSを右クリックして有効化してください
          </Typography>
        )}
        <Typography variant='body1'>{`Mosaic ${process.env.SYMBOL_MOSAIC_ID} の所有を証明します`}</Typography>
      </div>
    </>
  );
}
