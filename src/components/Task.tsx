import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import TaskOverlay from './TaskOverlay';
import { useSortable } from '@dnd-kit/sortable';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';

interface TaskProps {
  id: Id;
  hover?: boolean;
};

const Task = ({ id, hover = false }: TaskProps): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { getTaskData } = useBoardContext();
  const [hasHover, setHasHover] = useState(hover);

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
      sx={{ position: 'relative', ...style }}
      onMouseEnter={hover ? noop : () => setHasHover(true)}
      onMouseLeave={hover ? noop : () => setHasHover(false)}
      {...listeners}
      {...attributes}
    >
      <CardContent>
        {hasHover && <TaskOverlay />}
        <Typography variant='body1' pb={1}>{title}</Typography>
        <Divider />
        <Typography variant='body2' pt={1}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

const noop = () => {};

export default Task;