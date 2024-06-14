import { TextField } from '@mui/material';
import { DialogContent } from './DialogBase';

const DialogBody = (props: any): React.ReactNode => {
  return (
    <>
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
      <TextField
        fullWidth
        margin='normal'
        defaultValue={props.description}
        name='description'
        label='Description'
        type='text'
      />
    </>
  );
};

export const addTaskDialogContent: DialogContent = {
  title: 'Add task',
  body: DialogBody,
  acceptLabel: 'Add',
};

export const editTaskDialogContent: DialogContent = {
  title: 'Edit task',
  body: DialogBody,
  acceptLabel: 'Save',
};