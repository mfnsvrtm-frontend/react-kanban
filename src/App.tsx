import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Board from './components/Board';
import { DialogContextProvider } from './providers/DialogContextProvider';
import CursorOverrideProvider from './providers/CursorOverrideProvider';

const App = (): React.ReactNode => {

  return (
    <Box height={'100vh'}>
      <AppBar
        position='fixed'
        sx={{ bgcolor: 'primary.dark' }}
      >
        <Container>
          <Toolbar
            sx={{ placeContent: 'center' }}
          >
            <Typography variant='h5' >
              Kanban Inspired
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ pt: 8, minWidth: '100vw', display: 'inline-grid', gridTemplateColumns: 'minmax(300px, 1fr) auto minmax(300px, 1fr)' }}>
        <DialogContextProvider>
          <CursorOverrideProvider>
            <Board sx={{ gridColumn: 2 }} />
          </CursorOverrideProvider>
        </DialogContextProvider>
      </Box>
    </Box>
  );
};

export default App;