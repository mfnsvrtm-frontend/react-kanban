import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface SaveDialogProps {
  onSave: (saveName: string) => void;
  onClose: () => void;
};

const SaveDialog = ({ onSave, onClose }: SaveDialogProps): React.ReactNode => {
  return (
    <Dialog
      open
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSave(formData.get('name') as string);
        },
      }}
    >
      <DialogTitle>Save the board</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <TextField
          autoFocus
          fullWidth
          required
          margin='dense'
          name='name'
          label='Save name'
          type='text'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit'>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveDialog;