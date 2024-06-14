import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';

export interface Settings {
  showInfo: boolean
}

interface SettingsDialogProps {
  currentValues: Settings;
  onSave: (settings: Settings) => void;
  onClose: () => void;
};

const SettingsDialog = ({ currentValues, onSave, onClose }: SettingsDialogProps): React.ReactNode => {
  return (
    <Dialog
      open
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          console.log(formData.get('showInfo'));
          onSave({ showInfo: Boolean(formData.get('showInfo')) });
        },
      }}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <FormControlLabel name='showInfo' control={<Checkbox defaultChecked={currentValues.showInfo} />} label="Show info box in the bottom right corner on startup?" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit'>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;