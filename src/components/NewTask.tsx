import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';

interface NewTaskProps {
  
};

const NewTask = (props: NewTaskProps): React.ReactNode => {
  return (
    <Paper
      variant='outlined'
      sx={{ display: 'grid', placeContent: 'center', padding: 4, borderStyle: 'dashed' }}
    >
        <AddIcon sx={{ color: 'divider' }} />
    </Paper>
  );
};

export default NewTask;