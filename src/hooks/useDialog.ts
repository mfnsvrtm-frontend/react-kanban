import { useDialogContext } from '../providers/DialogContextProvider';
import { DialogContent } from '../components/dialogs/DialogBase';

interface UseDialogParams {
  content: DialogContent,
  props?: any,
  onAccept: (data: FormData) => void,
  onDecline?: () => void
}

const useDialog = ({ content, props = {}, onAccept, onDecline = noop }: UseDialogParams) => {
  const { open } = useDialogContext();
  return () => open(content, props, onAccept, onDecline);
};

const noop = () => { };

export default useDialog;