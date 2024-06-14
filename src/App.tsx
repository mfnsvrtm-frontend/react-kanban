import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Board from './components/Board';
import { DialogContextProvider } from './providers/DialogContextProvider';
import CursorOverrideProvider from './providers/CursorOverrideProvider';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { BoardSave, useBoard } from './hooks/useBoard';
import useLocalStorage from './hooks/useLocalStorage';
import InfoCard from './components/InfoCard';
import SideMenu from './components/SideMenu';
import LoadDialog from './components/LoadDialog';
import SaveDialog from './components/SaveDialog';
import SettingsDialog, { Settings } from './components/SettingsDialog';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ClearDialog from './components/ClearDialog';

interface KanbanLikeStorage {
  saves: { id: string, name: string, data: BoardSave }[]
  showInfo: boolean;
}

const App = (): React.ReactNode => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const { storedValue, setValue } = useLocalStorage<KanbanLikeStorage>('kanbanLikeStore', { saves: [], showInfo: true })
  const context = useBoard();

  console.log(storedValue)
  const saveData = storedValue.saves.map(save => ({ id: save.id, name: save.name }));

  const handleSaveDialogSuccess = (name: string) => {
    setShowSaveDialog(false);
    setValue({
      ...storedValue,
      saves: [...storedValue.saves, { id: nanoid(), name, data: context.save() }]
    })
  }

  const handleSaveDialogClose = () => {
    setShowSaveDialog(false);
  }

  const handleLoadDialogSuccess = (id: string) => {
    setShowLoadDialog(false);
    context.load(storedValue.saves.find(save => save.id === id)!.data);
  }

  const handleLoadDialogClose = () => {
    setShowLoadDialog(false);
  }

  const handleClearDialogAccept = () => {
    setShowClearDialog(false);
    context.clear();
  }

  const handleClearDialogDecline = () => {
    setShowClearDialog(false);
  }

  const handleSettingsDialogSuccess = (settings: Settings) => {
    setShowSettingsDialog(false);
    setValue({
      ...storedValue,
      showInfo: settings.showInfo,
    })
  }

  const handleSettingsDialogClose = () => {
    setShowSettingsDialog(false);
  }

  const handleDontShowThisAgain = () => {
    setValue({
      ...storedValue,
      showInfo: false,
    })
  }

  const handleDeleteSave = (id: string) => {
    setValue({
      ...storedValue,
      saves: storedValue.saves.filter(save => save.id !== id)
    })
  }

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
        {showSaveDialog ? <SaveDialog onClose={handleSaveDialogClose} onSave={handleSaveDialogSuccess} /> : null}
        {showLoadDialog ? <LoadDialog data={saveData} onClose={handleLoadDialogClose} onLoad={handleLoadDialogSuccess} onDelete={handleDeleteSave} /> : null}
        {showClearDialog ? <ClearDialog onAccept={handleClearDialogAccept} onDecline={handleClearDialogDecline} /> : null}
        {showSettingsDialog ? <SettingsDialog currentValues={{ showInfo: storedValue.showInfo }} onSave={handleSettingsDialogSuccess} onClose={handleSettingsDialogClose} /> : null}
        <SideMenu onSave={() => setShowSaveDialog(true)} onLoad={() => setShowLoadDialog(true)} onClear={() => setShowClearDialog(true)} onSettings={() => setShowSettingsDialog(true)} />
        {storedValue.showInfo ? <InfoCard onDontShowAgain={handleDontShowThisAgain} /> : null}
        <DialogContextProvider>
          <CursorOverrideProvider>
            <BoardContextProvider context={context}>
              <Board sx={{ gridColumn: 2 }} />
            </BoardContextProvider>
          </CursorOverrideProvider>
        </DialogContextProvider>
      </Box>
    </Box>
  );
};

export default App;