import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Stack, Typography } from '@mui/material';
import Task from './Task';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';
import Overlay from './Overlay';
import useHover from '../hooks/useHover';
import NewTask from './NewTask';
import { useDndContext } from '@dnd-kit/core';

interface ColumnProps {
  id: Id;
  hover?: boolean;
}

const Column = ({ id, hover = false }: ColumnProps): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover: titleHover, callbacks: titleHoverCallbacks } = useHover(hover);
  const { hasHover: bodyHover, callbacks: bodyHoverCallbacks } = useHover();
  const { getColumnTasks, getColumnData, deleteColumn } = useBoardContext();
  const { active } = useDndContext();

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const tasks = getColumnTasks(id);
  const { title } = getColumnData(id);

  return (
    <Stack width={300} gap={1.5} ref={setNodeRef} style={style}>
      <Paper variant='outlined' sx={{ position: 'relative', padding: 1.5, cursor: 'grab' }} {...attributes} {...listeners} {...titleHoverCallbacks}>
        {titleHover && <Overlay onDelete={() => deleteColumn(id)} onEdit={() => {}} />}
        <Typography sx={{ userSelect: 'none' }} fontSize={16} fontWeight={400} textAlign='center'>{title}</Typography>
      </Paper>
      <Paper variant='outlined' sx={{ padding: 1.5, minHeight: 200 }} {...bodyHoverCallbacks} >
        <Stack gap={1.5}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(task => <Task key={task} id={task} />)}
          </SortableContext>
          {bodyHover && !active && <NewTask columnId={id} />}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Column;