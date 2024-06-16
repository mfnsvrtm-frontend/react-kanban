import { useState } from 'react';
import { PropsWithChildren, createContext, useContext } from 'react';
import DialogBase, { DialogContent, DialogDefinition } from '../components/dialogs/DialogBase';
import { SxProps, Theme } from '@mui/system';

type OpenDialogFn = (
  content: DialogContent,
  props: any,
  onAccept: (data: FormData) => void,
  onDecline: () => void,
  sx: SxProps<Theme> | undefined
) => void;

interface DialogContext {
  isOpen: boolean;
  open: OpenDialogFn;
}

const dialogContext = createContext<DialogContext | null>(null);

export const useDialogContext = (): DialogContext => {
  const context = useContext(dialogContext);

  if (!context)
    throw new Error('Attempted to call useDialogContext outside of DialogContextProvider');

  return context;
};

export const DialogContextProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [dialogDefinition, setDialogDefinition] = useState<DialogDefinition>(null!);
  const [isOpen, setIsOpen] = useState(false);

  const open: OpenDialogFn = (content, props, onAccept, onDecline, sx) => {
    setIsOpen(true);
    setDialogDefinition({
      content,
      props,
      onAccept: (data) => {
        onAccept(data);
        setIsOpen(false);
      },
      onDecline: () => {
        onDecline();
        setIsOpen(false);
      },
      sx
    });
  };

  return (
    <dialogContext.Provider value={{ isOpen, open }}>
      {children}
      {isOpen && <DialogBase {...dialogDefinition} />}
    </dialogContext.Provider>
  );
};