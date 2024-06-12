import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Board from './components/Board';
import { DialogContextProvider } from './providers/DialogContextProvider';
import CursorOverrideProvider from './providers/CursorOverrideProvider';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { BoardSave, useBoard } from './hooks/useBoard';
import useLocalStorage from './hooks/useLocalStorage';
import InfoCard from './components/InfoCard';
import SideMenu from './components/SideMenu';

interface KanbanLikeStorage {
  saves: {
    [name: string]: BoardSave;
  }
  showInfo: boolean;
}

const App = (): React.ReactNode => {
  const { storedValue, setValue } = useLocalStorage<KanbanLikeStorage | null>('kanbanLikeStore', null)
  const context = useBoard();

  const handleSave = () => {
    console.log('saving')
    setValue({
      saves: {
        '1': context.save(),
      },
      showInfo: true,
    })
  }

  const handleLoad = () => {
    context.load(storedValue?.saves['1']!);
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
        <SideMenu onSave={handleSave} onLoad={handleLoad} />
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