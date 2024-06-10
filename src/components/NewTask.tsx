import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';
import TaskDialog, { DialogType } from './TaskDialog';
import { useState } from 'react';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';

interface NewTaskProps {
  columnId: Id;
};

const NewTask = ({ columnId }: NewTaskProps): React.ReactNode => {
  const { addTask } = useBoardContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (data: FormData) => {
    addTask(
      columnId,
      {
        title: data.get('title') as string,
        description: data.get('description') as string
    });
  }

  return (
    <>
      <Paper
        variant='outlined'
        sx={{ display: 'grid', placeContent: 'center', padding: 4, borderStyle: 'dashed', cursor: 'pointer' }}
        onClick={(() => setIsDialogOpen(true))}
      >
        <AddIcon sx={{ color: 'divider' }} />
      </Paper>
      <TaskDialog
        type={DialogType.AddTask}
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onSuccess={handleSubmit}
      />
    </>
  );
};

export default NewTask;