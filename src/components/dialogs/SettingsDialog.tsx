import { Checkbox, FormControlLabel } from '@mui/material';
import { DialogContent } from './DialogBase';

const DialogBody = (props: any): React.ReactNode => {
  return (
    <FormControlLabel name='showInfo' control={<Checkbox defaultChecked={props.showInfo} />} label="Show info box in the bottom right corner on startup?" />
  );
};

export const settingsDialogContent: DialogContent = {
  title: 'Settings',
  body: DialogBody,
  acceptLabel: 'Save',
};