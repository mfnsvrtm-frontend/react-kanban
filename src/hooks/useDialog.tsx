import { useDialogContext } from '../components/DialogContextProvider';
import { DialogType } from '../components/TaskDialog';

interface DialogParams {
  type: DialogType;
  onCancel?: () => void;
  onSuccess: (data: FormData) => void;
}

const useDialog = ({ type, onCancel = noop, onSuccess }: DialogParams) => {
  const open = useDialogContext();
  return () => open(type, onCancel, onSuccess);
};

const noop = () => {}

export default useDialog;