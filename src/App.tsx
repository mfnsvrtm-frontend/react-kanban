import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Board from './components/board/Board';
import CursorOverrideProvider from './providers/CursorOverrideProvider';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { useBoard } from './hooks/useBoard';
import AppOverlay from './components/AppOverlay';

const App = (): React.ReactNode => {
  const context = useBoard();

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
        <CursorOverrideProvider>
          <BoardContextProvider context={context}>
            <AppOverlay />
            <Board sx={{ gridColumn: 2 }} />
          </BoardContextProvider>
        </CursorOverrideProvider>
      </Box>
    </Box>
  );
};

export default App;