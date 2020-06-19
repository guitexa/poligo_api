import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useToast } from '../../hooks/toast';

interface ToastContent {
  open: boolean;
  toastContent: {
    type: 'success' | 'info' | 'warning' | 'error';
    description: string;
  };
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={0} variant="filled" {...props} />;
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
      >
        <Alert severity={toastContent.type}>{toastContent.description}</Alert>
      </Snackbar>
    </>
  );
};

export default MaterialToast;
