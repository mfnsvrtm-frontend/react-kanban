import { useState } from 'react';
import { PropsWithChildren, createContext, useContext } from 'react';
import { BoardDialog, DialogType } from './BoardDialog';

type OpenDialogFn = (
  type: DialogType,
  data: { [name: string]: string },
  onCancel: () => void,
  onSuccess: (data: FormData) => void
) => void;

const dialogContext = createContext<OpenDialogFn | null>(null);

export const useDialogContext = (): OpenDialogFn => {
  const context = useContext(dialogContext);

  if (!context)
    throw new Error('Attempted to call useDialogContext outside of DialogContextProvider');

  return context;
};

interface DialogData {
  type: DialogType;
  data: { [name: string]: string }
  onCancel: () => void;
  onSuccess: (data: FormData) => void;
}

export const DialogContextProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [dialogData, setDialogData] = useState<DialogData>(null!);
  const [isOpen, setIsOpen] = useState(false);

  const open: OpenDialogFn = (type, data, onCancel, onSuccess) => {
    setIsOpen(true);
    setDialogData({
      type,
      data,
      onCancel: () => {
        onCancel();
        setIsOpen(false);
      },
      onSuccess: (data) => {
        onSuccess(data);
        setIsOpen(false);
      }
    });
  };

  return (
    <dialogContext.Provider value={open}>
      {children}
      {isOpen && <BoardDialog {...dialogData} />}
    </dialogContext.Provider>
  );
};