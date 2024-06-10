import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export const enum DialogType {
  AddTask,
  EditTask,
}

export interface TaskDialogProps {
  type: DialogType;
  onCancel: () => void;
  onSuccess: (data: FormData) => void;
};

export const TaskDialog = ({ type, onCancel, onSuccess }: TaskDialogProps): React.ReactNode => {
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
      open
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