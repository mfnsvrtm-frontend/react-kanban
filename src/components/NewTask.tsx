import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';
import { DialogType } from './BoardDialog';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';
import useDialog from '../hooks/useDialog';

interface NewTaskProps {
  columnId: Id;
};

const NewTask = ({ columnId }: NewTaskProps): React.ReactNode => {
  const { addTask } = useBoardContext();
  const openDialog = useDialog({
    type: DialogType.AddTask,
    onSuccess: (data: FormData) => {
      addTask(
        columnId,
        {
          title: data.get('title') as string,
          description: data.get('description') as string
      })
    }
  });

  return (
    <>
      <Paper
        variant='outlined'
        sx={{ display: 'grid', placeContent: 'center', padding: 4, borderStyle: 'dashed', cursor: 'pointer' }}
        onClick={openDialog}
      >
        <AddIcon sx={{ color: 'divider' }} />
      </Paper>
    </>
  );
};

export default NewTask;