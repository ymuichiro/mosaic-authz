import { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '5px',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Card
            variant='error'
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '500px',
            }}
          >
            <CardContent>
              <Typography variant='h5' color='textSecondary' align='left'>
                Error
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button color='error' onClick={() => this.setState({ hasError: false })}>
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
