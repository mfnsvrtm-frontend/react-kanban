import { SortableContext, useSortable, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { Paper, Stack, Typography } from '@mui/material';
import Task from './Task';
import { Id } from '../../types';
import { useBoardContext } from '../../providers/BoardContextProvider';
import Overlay from './Overlay';
import useHover from '../../hooks/useHover';
import NewTask from './NewTask';
import useDialog from '../../hooks/useDialog';
import { editColumnDialogContent } from '../dialogs/AddEditColumnDialogs';

interface ColumnProps {
  id: Id;
}

const Column = ({ id }: ColumnProps): React.ReactNode => {
  const { active, attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover: titleHover, callbacks: titleHoverCallbacks } = useHover(id);
  const { hasHover: bodyHover, callbacks: bodyHoverCallbacks } = useHover();
  const { getColumnTasks, getColumnData, deleteColumn, editColumn } = useBoardContext();

  const tasks = getColumnTasks(id);
  const { title } = getColumnData(id);

  const openEditDialog = useDialog({
    content: editColumnDialogContent,
    props: { title },
    onAccept: (data: FormData) => {
      editColumn(id, {
        title: data.get('title') as string,
      });
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : '',
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  return (
    <Stack width={300} gap={1.5} ref={setNodeRef} style={style}>
      <Paper
        variant='outlined'
        sx={{ position: 'relative', padding: 1.5, cursor: 'grab' }}
        {...attributes}
        {...listeners}
        {...titleHoverCallbacks}
      >
        {titleHover && (
          <Overlay onDelete={() => deleteColumn(id)} onEdit={openEditDialog} />
        )}
        <Typography
          sx={{ userSelect: 'none', overflowWrap: 'break-word' }}
          variant='h2'
          textAlign='center'
        >
          {title}
        </Typography>
      </Paper>
      <Paper variant='outlined' sx={{ padding: 1.5 }} {...bodyHoverCallbacks}>
        <Stack gap={1.5}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (<Task key={task} id={task} />))}
          </SortableContext>
          {((bodyHover && !active) || tasks.length === 0) && (
            <NewTask columnId={id} />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Column;
