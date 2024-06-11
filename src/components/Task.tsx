import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { Id } from '../types';
import { useBoardContext } from '../providers/BoardContextProvider';
import Overlay from './Overlay';
import useHover from '../hooks/useHover';
import useDialog from '../hooks/useDialog';
import { DialogType } from './BoardDialog';

interface TaskProps {
  id: Id;
};

const Task = ({ id }: TaskProps): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover, callbacks: hoverCallbacks } = useHover(id);
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
    opacity: isDragging ? 0.1 : 1,
  };
  const titleOnlyStyle = { '&&&': { paddingBottom: '8px' } };

  return (
    <Card ref={setNodeRef} variant='outlined' style={style} {...listeners} {...attributes}>
      <CardContent sx={{ position: 'relative', cursor: 'grab', ...(!description && titleOnlyStyle) }} {...hoverCallbacks}  >
        {hasHover && <Overlay onDelete={() => deleteTask(id)} onEdit={openEditDialog} />}
        <Typography sx={{ overflowWrap: 'break-word' }} variant='body1' pb={1}>{title}</Typography>
        {description && <>
          <Divider />
          <Typography sx={{ overflowWrap: 'break-word' }} variant='body2' pt={1}>{description}</Typography>
        </>}
      </CardContent>
    </Card>
  );
};

export default Task;