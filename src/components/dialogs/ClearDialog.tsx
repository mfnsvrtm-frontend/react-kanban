import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ClearDialogProps {
  onAccept: () => void;
  onDecline: () => void;
};

const ClearDialog = ({ onAccept, onDecline }: ClearDialogProps): React.ReactNode => {
  return (
    <Dialog
      open
      onClose={onDecline}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onAccept();
        },
      }}
    >
      <DialogTitle>Clear the board</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <Typography>Are you sure you want to clear the board?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDecline}>No</Button>
        <Button type='submit'>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClearDialog;