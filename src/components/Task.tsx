import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { Id } from '../types';
import { useBoardContext } from '../providers/BoardContextProvider';
import Overlay from './Overlay';
import useOverlay from '../hooks/useOverlay';
import { useDndContext } from '@dnd-kit/core';
import useDialog from '../hooks/useDialog';
import { DialogType } from './BoardDialog';

interface TaskProps {
  id: Id;
  overlay?: boolean;
};

const Task = ({ id, overlay = false }: TaskProps): React.ReactNode => {
  const { active } = useDndContext();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover, callbacks: hoverCallbacks } = useOverlay(overlay ? 'always-on' : active ? 'always-off' : 'hover');
  const { getTaskData, deleteTask, editTask } = useBoardContext();

  const { title, description } = getTaskData(id);
  const openEditDialog = useDialog({
    type: DialogType.EditTask,
    data: { title, description },
    onSuccess: (data: FormData) => {
      editTask(id, {
          title: data.get('title') as string,
          description: data.get('description') as string
      });
    }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      variant='outlined'
      style={style}
      {...listeners}
      {...attributes}
    >
      <CardContent sx={{ position: 'relative' }} {...hoverCallbacks}>
        {hasHover && <Overlay onDelete={() => deleteTask(id)} onEdit={openEditDialog} />}
        <Typography variant='body1' pb={1}>{title}</Typography>
        <Divider />
        <Typography variant='body2' pt={1}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;