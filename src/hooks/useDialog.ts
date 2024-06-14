import { useDialogContext } from '../providers/DialogContextProvider';
import { DialogType } from '../components/dialogs/BoardDialog';

interface DialogParams {
  type: DialogType;
  data?: { [name: string]: string; };
  onCancel?: () => void;
  onSuccess: (data: FormData) => void;
}

const useDialog = ({ type, data = {}, onCancel = noop, onSuccess }: DialogParams) => {
  const { open } = useDialogContext();
  return () => open(type, data, onCancel, onSuccess);
};

const noop = () => { };

export default useDialog;