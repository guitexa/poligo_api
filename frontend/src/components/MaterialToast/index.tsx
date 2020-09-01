import React, { forwardRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { useToast } from '../../hooks/toast';

interface ToastContent {
  open: boolean;
  toastContent: {
    type: 'success' | 'info' | 'warning' | 'error';
    description: string;
  };
}

const Alert = forwardRef((props: AlertProps, ref) => (
  <MuiAlert elevation={0} variant="filled" {...props} ref={ref} />
));

function SlideTransition(props: TransitionProps): JSX.Element {
  return <Slide {...props} direction="left" />;
}

const MaterialToast: React.FC<ToastContent> = ({ open, toastContent }) => {
  const { handleClose } = useToast();

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={toastContent.type}>{toastContent.description}</Alert>
      </Snackbar>
    </>
  );
};

export default MaterialToast;
