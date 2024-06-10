import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Id } from '../types';

export const enum DialogType {
  AddTask,
  EditTask,
}

interface TaskDialogProps {
  type: DialogType;
  id?: Id;
  open: boolean;
  onCancel: () => void;
  onSuccess: (data: FormData) => void;
};

const TaskDialog = ({ type, id, open, onCancel, onSuccess }: TaskDialogProps): React.ReactNode => {
  let title: string;
  let submitLabel: string;
  let formContent;

  switch (type) {
    case DialogType.AddTask:
      title = 'Add task';
      submitLabel = 'Add';
      break;
    case DialogType.EditTask:
      title = 'Edit task';
      submitLabel = 'Save';
      break;
  }

  if ([DialogType.AddTask, DialogType.EditTask].includes(type)) {
    formContent = (
      <DialogContent>
        <TextField
          fullWidth
          required
          name="title"
          label="Title"
          type="text"
        />
        <TextField
          fullWidth
          required
          name="description"
          label="Description"
          type="text"
        />
      </DialogContent>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSuccess(formData);
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      {formContent}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">{submitLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;