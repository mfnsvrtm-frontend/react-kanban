import { useState } from 'react';
import useDialog from '../hooks/useDialog';
import { useBoardContext } from '../providers/BoardContextProvider';
import { nanoid } from 'nanoid';
import InfoCard from './InfoCard';
import SideMenu from './SideMenu';
import LoadDialog from './dialogs/LoadDialog';
import { settingsDialogContent } from './dialogs/SettingsDialog';
import { clearDialogContent } from './dialogs/ClearDialog';
import { saveDialogContent } from './dialogs/SaveDialog';
import { BoardSave } from '../hooks/useBoard';
import useLocalStorage from '../hooks/useLocalStorage';

export interface KanbanLikeStorage {
  saves: { id: string, name: string, data: BoardSave; }[];
  showInfo: boolean;
}

const AppOverlay = (): React.ReactNode => {
  const { storedValue, setValue } = useLocalStorage<KanbanLikeStorage>('kanbanLikeStore', { saves: [], showInfo: true });
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const saveData = storedValue.saves.map(save => ({ id: save.id, name: save.name }));
  const context = useBoardContext();

  const openSaveDialog = useDialog({
    content: saveDialogContent,
    onAccept: (data: FormData) => {
      setValue({
        ...storedValue,
        saves: [...storedValue.saves, { id: nanoid(), name: data.get('name') as string, data: context.save() }]
      });
    },
    sx: { width: 500 }
  });

  const openClearDialog = useDialog({
    content: clearDialogContent,
    onAccept: () => context.clear()
  });

  const openSettingsDialog = useDialog({
    content: settingsDialogContent,
    onAccept: (data: FormData) => {
      setValue({
        ...storedValue,
        showInfo: Boolean(data.get('showInfo')),
      });
    },
    props: { showInfo: storedValue.showInfo }
  });

  const handleLoadDialogSuccess = (id: string) => {
    setShowLoadDialog(false);
    context.load(storedValue.saves.find(save => save.id === id)!.data);
  };

  const handleLoadDialogClose = () => {
    setShowLoadDialog(false);
  };

  const handleDeleteSave = (id: string) => {
    setValue({
      ...storedValue,
      saves: storedValue.saves.filter(save => save.id !== id)
    });
  };

  const handleDontShowThisAgain = () => {
    setValue({
      ...storedValue,
      showInfo: false,
    });
  };

  return (
    <>
      <SideMenu onSave={openSaveDialog} onLoad={() => setShowLoadDialog(true)} onClear={openClearDialog} onSettings={openSettingsDialog} />
      {showLoadDialog ? <LoadDialog data={saveData} onClose={handleLoadDialogClose} onLoad={handleLoadDialogSuccess} onDelete={handleDeleteSave} /> : null}
      {storedValue.showInfo ? <InfoCard onDontShowAgain={handleDontShowThisAgain} /> : null}
    </>
  );
};

export default AppOverlay;