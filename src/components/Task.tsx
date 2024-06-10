import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';
import Overlay from './Overlay';
import useOverlay from '../hooks/useOverlay';
import { useDndContext } from '@dnd-kit/core';

interface TaskProps {
  id: Id;
  overlay?: boolean;
};

const Task = ({ id, overlay = false }: TaskProps): React.ReactNode => {
  const { active } = useDndContext();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover, callbacks: hoverCallbacks } = useOverlay(overlay ? 'always-on' : active ? 'always-off' : 'hover');
  const { getTaskData, deleteTask } = useBoardContext();

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const { title, description } = getTaskData(id);

  return (
    <Card
      ref={setNodeRef}
      variant='outlined'
      style={style}
      {...listeners}
      {...attributes}
    >
      <CardContent sx={{ position: 'relative' }} {...hoverCallbacks}>
        {hasHover && <Overlay onDelete={() => deleteTask(id)} onEdit={() => {}} />}
        <Typography variant='body1' pb={1}>{title}</Typography>
        <Divider />
        <Typography variant='body2' pt={1}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;