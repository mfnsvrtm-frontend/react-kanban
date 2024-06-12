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
import { useState } from 'react';

interface KanbanLikeStorage {
  saves: { name: string, data: BoardSave }[]
  showInfo: boolean;
}

const App = (): React.ReactNode => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const { storedValue, setValue } = useLocalStorage<KanbanLikeStorage>('kanbanLikeStore', { saves: [], showInfo: true })
  const context = useBoard();

  console.log(storedValue)
  const saveNames = storedValue.saves.map(save => save.name);

  // const handleSave = () => {
  //   console.log('saving')
  //   setValue({
  //     saves: {
  //       '1': context.save(),
  //     },
  //     showInfo: true,
  //   })
  // }

  // const handleLoad = () => {
  //   context.load(storedValue?.saves['1']!);
  // }

  const handleSaveDialogSuccess = (name: string) => {
    setShowSaveDialog(false);
    setValue({
      ...storedValue,
      saves: [...storedValue.saves, { name, data: context.save() }]
    })
  }

  const handleSaveDialogClose = () => {
    setShowSaveDialog(false);
  }

  const handleLoadDialogSuccess = (name: string) => {
    setShowLoadDialog(false);
    context.load(storedValue.saves.find(save => save.name === name)!.data);
  }

  const handleLoadDialogClose = () => {
    setShowLoadDialog(false);
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
      <Box sx={{ pt: 8, minWidth: '100vw', display: 'inline-grid', gridTemplateColumns: 'minmax(300px, 1fr) auto minmax(300px, 1fr)' }}>
        {showSaveDialog ? <SaveDialog onClose={handleSaveDialogClose} onSave={handleSaveDialogSuccess} /> : null}
        {showLoadDialog ? <LoadDialog data={saveNames} onClose={handleLoadDialogClose} onLoad={handleLoadDialogSuccess} /> : null}
        <SideMenu onSave={() => setShowSaveDialog(true)} onLoad={() => setShowLoadDialog(true)} />
        <InfoCard />
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