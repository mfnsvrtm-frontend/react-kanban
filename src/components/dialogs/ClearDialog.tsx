import { Typography } from '@mui/material';
import { DialogContent } from './DialogBase';

const DialogBody = (): React.ReactNode => {
  return (
    <Typography>Are you sure you want to clear the board?</Typography>
  );
};

export const clearDialogContent: DialogContent = {
  title: 'Clear the board',
  body: DialogBody,
  acceptLabel: 'Yes',
  declineLabel: 'No'
};