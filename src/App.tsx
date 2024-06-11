import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import Board from './components/Board';
import { DialogContextProvider } from './providers/DialogContextProvider';
import CursorOverrideProvider from './providers/CursorOverrideProvider';

const App = (): React.ReactNode => {

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
      <Container sx={{
        flexGrow: 1,
      }}>
        <DialogContextProvider>
          <CursorOverrideProvider>
            <Board />
          </CursorOverrideProvider>
        </DialogContextProvider>
      </Container>
    </Stack>
  );
};

export default App;