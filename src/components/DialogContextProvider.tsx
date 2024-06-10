import { useState } from 'react';
import { PropsWithChildren, createContext, useContext } from 'react';
import { TaskDialog, DialogType } from '../components/TaskDialog';

type OpenDialogFn = (type: DialogType, onCancel: () => void, onSuccess: (data: FormData) => void) => void;

const dialogContext = createContext<OpenDialogFn | null>(null);

export const useDialogContext = (): OpenDialogFn => {
  const context = useContext(dialogContext);

  if (!context)
    throw new Error('Attempted to call useDialogContext outside of DialogContextProvider');

  return context;
};

interface DialogData {
  type: DialogType;
  onCancel: () => void;
  onSuccess: (data: FormData) => void;
}

export const DialogContextProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [dialogData, setDialogData] = useState<DialogData>(null!);
  const [isOpen, setIsOpen] = useState(false);

  const open: OpenDialogFn = (type, onCancel, onSuccess) => {
    setIsOpen(true);
    setDialogData({
      type,
      onCancel,
      onSuccess: (data) => {
        onSuccess(data);
        setIsOpen(false)
      }
    });
  };

  return (
    <dialogContext.Provider value={open}>
      {children}
      {isOpen && <TaskDialog {...dialogData} />}
    </dialogContext.Provider>
  );
};