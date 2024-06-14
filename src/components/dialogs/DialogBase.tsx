import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export interface DialogContent {
  title: string;
  body: (props: any) => React.ReactNode;
  acceptLabel: string;
}

export interface DialogDefinition {
  content: DialogContent,
  props: any,
  onAccept: (data: FormData) => void,
  onDecline: () => void
}

const DialogBase = ({ content, props, onAccept, onDecline }: DialogDefinition): React.ReactNode => {
  return (
    <Dialog
      open
      onClose={onDecline}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onAccept(formData);
        },
      }}
    >
      <DialogTitle>{content.title}</DialogTitle>
      <DialogContent>
        {content.body(props)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDecline}>Cancel</Button>
        <Button type='submit'>{content.acceptLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBase;