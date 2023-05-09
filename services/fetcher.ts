interface GetMosaicInfoResponse {
  adminPublicKey: string;
  mosaicId: string;
  networkType: string;
}

export async function getMosaicInfo(): Promise<GetMosaicInfoResponse> {
  try {
    const res = await fetch('/api/mosaic', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new Error();
    }

    return await res.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

interface GetFinishedResponse {
  callback: string;
}

export async function getFinished(): Promise<GetFinishedResponse> {
  try {
    const res = await fetch('/api/finish', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new Error();
    }

    return await res.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

export async function postAuthz(userPublicKey: string, token: string): Promise<void> {
  try {
    const res = await fetch('/api/authz', {
      method: 'POST',
      body: JSON.stringify({ userPublicKey, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 204) {
      throw new Error();
    }
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}
