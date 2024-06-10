import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export const enum DialogType {
  AddTask,
  EditTask,
  AddColumn,
  EditColumn,
}

export interface BoardDialogProps {
  type: DialogType;
  data: { [name: string]: string; };
  onCancel: () => void;
  onSuccess: (data: FormData) => void;
};

export const BoardDialog = ({ type, data, onCancel, onSuccess }: BoardDialogProps): React.ReactNode => {
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
    case DialogType.EditColumn:
      title = 'Edit column';
      submitLabel = 'Save';
      break;
    case DialogType.AddColumn:
      title = 'Add column';
      submitLabel = 'Add';
      break;
  }

  if ([DialogType.AddTask, DialogType.EditTask].includes(type)) {
    formContent = (
      <DialogContent>
        <TextField
          fullWidth
          required
          defaultValue={data.title}
          name="title"
          label="Title"
          type="text"
        />
        <TextField
          fullWidth
          required
          defaultValue={data.description}
          name="description"
          label="Description"
          type="text"
        />
      </DialogContent>
    );
  } else if ([DialogType.AddColumn, DialogType.EditColumn].includes(type)) {
    formContent = (
      <DialogContent>
        <TextField
          fullWidth
          required
          defaultValue={data.title}
          name="title"
          label="Title"
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