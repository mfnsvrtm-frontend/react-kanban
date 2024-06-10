import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import Board from './components/Board';
import { BoardContextProvider } from './components/BoardContextProvider';
import { useBoard } from './hooks/useBoard';

const App = (): React.ReactNode => {
  const boardContext = useBoard();

  return (
    <Stack height={'100vh'}>
      <AppBar
        position='relative'
        sx={{ bgcolor: 'primary.dark' }}
      >
        <Container>
          <Toolbar
            sx={{ placeContent: 'center' }}
          >
            <Typography variant='h5' >
              Kanban Board
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ flexGrow: 1 }}>
        <BoardContextProvider context={boardContext}>
          <Board />
        </BoardContextProvider>
      </Container>
    </Stack>
  );
};

export default App;