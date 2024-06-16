import { TextField } from '@mui/material';
import { DialogContent } from './DialogBase';

const DialogBody = (): React.ReactNode => {
  return (
    <TextField
      autoFocus
      fullWidth
      required
      margin='dense'
      name='name'
      label='Save name'
      type='text'
    />
  );
};

export const saveDialogContent: DialogContent = {
  title: 'Save the board',
  body: DialogBody,
  acceptLabel: 'Save',
};