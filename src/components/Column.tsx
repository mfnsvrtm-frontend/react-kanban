import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Stack, Typography } from '@mui/material';
import Task from './Task';
import { Id } from '../types';
import { useBoardContext } from './BoardContextProvider';
import Overlay from './Overlay';
import useOverlay from '../hooks/useOverlay';
import NewTask from './NewTask';
import { useDndContext } from '@dnd-kit/core';
import useDialog from '../hooks/useDialog';
import { DialogType } from './BoardDialog';

interface ColumnProps {
  id: Id;
  overlay?: boolean
}

const Column = ({ id, overlay = false }: ColumnProps): React.ReactNode => {
  const { active } = useDndContext();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { hasHover: titleHover, callbacks: titleHoverCallbacks } = useOverlay(overlay ? 'always-on' : active ? 'always-off' : 'hover');
  const { hasHover: bodyHover, callbacks: bodyHoverCallbacks } = useOverlay();
  const { getColumnTasks, getColumnData, deleteColumn, editColumn } = useBoardContext();

  const tasks = getColumnTasks(id);
  const { title } = getColumnData(id);

  const openEditDialog = useDialog({
    type: DialogType.EditColumn,
    data: { title },
    onSuccess: (data: FormData) => {
      editColumn(id, {
          title: data.get('title') as string,
      });
    }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <Stack width={300} gap={1.5} ref={setNodeRef} style={style}>
      <Paper variant='outlined' sx={{ position: 'relative', padding: 1.5, cursor: 'grab' }} {...attributes} {...listeners} {...titleHoverCallbacks}>
        {titleHover && <Overlay onDelete={() => deleteColumn(id)} onEdit={openEditDialog} />}
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