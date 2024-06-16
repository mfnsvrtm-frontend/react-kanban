import { Button, Dialog, DialogActions, DialogContent, DialogTitle, SxProps, Theme } from '@mui/material';

export interface DialogContent {
  title: string;
  body: (props: any) => React.ReactNode;
  acceptLabel: string;
  declineLabel?: string;
}

export interface DialogDefinition {
  content: DialogContent;
  props: any;
  onAccept: (data: FormData) => void;
  onDecline: () => void;
  sx?: SxProps<Theme>;
}

const DialogBase = ({ content, props, onAccept, onDecline, sx }: DialogDefinition): React.ReactNode => {
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
      <DialogContent sx={sx}>
        <content.body {...props} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDecline}>{content.declineLabel || 'Cancel'}</Button>
        <Button type='submit'>{content.acceptLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBase;