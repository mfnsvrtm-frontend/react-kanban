import { TextField } from '@mui/material';
import { DialogContent } from './DialogBase';

const DialogBody = (props: any): React.ReactNode => {
  return (
    <TextField
      autoFocus
      fullWidth
      required
      margin='normal'
      defaultValue={props.title}
      name='title'
      label='Title'
      type='text'
    />
  );
};

export const addColumnDialogContent: DialogContent = {
  title: 'Add column',
  body: DialogBody,
  acceptLabel: 'Add',
};

export const editColumnDialogContent: DialogContent = {
  title: 'Edit column',
  body: DialogBody,
  acceptLabel: 'Save',
};