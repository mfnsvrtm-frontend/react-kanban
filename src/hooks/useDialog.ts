import { useDialogContext } from '../providers/DialogContextProvider';
import { DialogContent } from '../components/dialogs/DialogBase';
import { SxProps, Theme } from '@mui/system';

interface UseDialogParams {
  content: DialogContent;
  props?: any;
  onAccept: (data: FormData) => void;
  onDecline?: () => void;
  sx?: SxProps<Theme>;
}

const useDialog = ({ content, props = {}, onAccept, onDecline = noop, sx }: UseDialogParams) => {
  const { open } = useDialogContext();
  return () => open(content, props, onAccept, onDecline, sx);
};

const noop = () => { };

export default useDialog;