import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Stack, Typography } from '@mui/material';
import Task from './Task';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';
import Overlay from './Overlay';
import useHover from '../hooks/useHover';

interface ColumnProps {
  id: Id;
  hover?: boolean;
}

const Column = ({ id, hover = false }: ColumnProps): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover, style: hoverParentStyle, callbacks: hoverCallbacks } = useHover(hover);
  const { getColumnTasks, getColumnData } = useBoardContext();

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const tasks = getColumnTasks(id);
  const { title } = getColumnData(id);

  return (
    <Stack width={300} gap={1.5} ref={setNodeRef} style={style}>
      <Paper variant='outlined' sx={{ ...hoverParentStyle, padding: 1.5, cursor: 'grab' }} {...attributes} {...listeners} {...hoverCallbacks}>
        {hasHover && <Overlay />}
        <Typography sx={{ userSelect: 'none' }} fontSize={16} fontWeight={400} textAlign='center'>{title}</Typography>
      </Paper>
      <Paper variant='outlined' sx={{ padding: 1.5, minHeight: 200 }} >
        <Stack gap={1.5}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(task => <Task key={task} id={task} />)}
          </SortableContext>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Column;