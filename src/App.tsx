import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Board from './components/board/Board';
import CursorOverrideProvider from './providers/CursorOverrideProvider';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { BoardSave, useBoard } from './hooks/useBoard';
import useLocalStorage from './hooks/useLocalStorage';
import InfoCard from './components/InfoCard';
import SideMenu from './components/SideMenu';
import LoadDialog from './components/dialogs/LoadDialog';
import { settingsDialogContent } from './components/dialogs/SettingsDialog';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { clearDialogContent } from './components/dialogs/ClearDialog';
import useDialog from './hooks/useDialog';
import { saveDialogContent } from './components/dialogs/SaveDialog';

interface KanbanLikeStorage {
  saves: { id: string, name: string, data: BoardSave; }[];
  showInfo: boolean;
}

const App = (): React.ReactNode => {
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const { storedValue, setValue } = useLocalStorage<KanbanLikeStorage>('kanbanLikeStore', { saves: [], showInfo: true });
  const context = useBoard();

  const saveData = storedValue.saves.map(save => ({ id: save.id, name: save.name }));

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

  const handleLoadDialogSuccess = (id: string) => {
    setShowLoadDialog(false);
    context.load(storedValue.saves.find(save => save.id === id)!.data);
  };

  const handleLoadDialogClose = () => {
    setShowLoadDialog(false);
  };

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

  const handleDontShowThisAgain = () => {
    setValue({
      ...storedValue,
      showInfo: false,
    });
  };

  const handleDeleteSave = (id: string) => {
    setValue({
      ...storedValue,
      saves: storedValue.saves.filter(save => save.id !== id)
    });
  };

  return (
    <Box height={'100vh'}>
      <AppBar>
        <Container>
          <Toolbar sx={{ placeContent: 'center' }}>
            <Typography variant='h1' >
              Kanban Inspired
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box pt={8} height='100%' minWidth='100vw' display='inline-grid' gridTemplateColumns='minmax(300px, 1fr) auto minmax(300px, 1fr)'>
        {showLoadDialog ? <LoadDialog data={saveData} onClose={handleLoadDialogClose} onLoad={handleLoadDialogSuccess} onDelete={handleDeleteSave} /> : null}
        <SideMenu onSave={openSaveDialog} onLoad={() => setShowLoadDialog(true)} onClear={openClearDialog} onSettings={openSettingsDialog} />
        {storedValue.showInfo ? <InfoCard onDontShowAgain={handleDontShowThisAgain} /> : null}
        <CursorOverrideProvider>
          <BoardContextProvider context={context}>
            <Board sx={{ gridColumn: 2 }} />
          </BoardContextProvider>
        </CursorOverrideProvider>
      </Box>
    </Box>
  );
};

export default App;