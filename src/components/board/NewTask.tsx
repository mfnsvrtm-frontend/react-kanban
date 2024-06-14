import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';
import { Id } from '../../types';
import { useBoardContext } from '../../providers/BoardContextProvider';
import useDialog from '../../hooks/useDialog';
import { useEffect, useRef } from 'react';
import useMousePredicate from '../../hooks/useMousePosition';
import { addTaskDialogContent } from '../dialogs/AddEditTaskDialogs';

const scrollThreshold = 200;

interface NewTaskProps {
  columnId: Id;
};

const NewTask = ({ columnId }: NewTaskProps): React.ReactNode => {
  const mouseLowEnough = useMousePredicate(event => window.innerHeight - event.clientY < scrollThreshold);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addTask } = useBoardContext();

  const openDialog = useDialog({
    content: addTaskDialogContent,
    onAccept: (data: FormData) => {
      addTask(
        columnId,
        {
          title: data.get('title') as string,
          description: data.get('description') as string
        });
    }
  });

  useEffect(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollLowEnough = documentHeight - innerHeight - scrollTop < scrollThreshold;

    if (mouseLowEnough && scrollLowEnough)
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
  }, [mouseLowEnough]);

  return (
    <>
      <Paper
        ref={scrollRef}
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