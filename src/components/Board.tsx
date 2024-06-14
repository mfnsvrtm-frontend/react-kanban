import { Stack } from '@mui/material';
import Column from './Column';
import Task from './Task';
import { CollisionDetection, DndContext, DragOverlay, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { MouseSensor } from '../utils/sensors';
import NewColumn from './NewColumn';
import useKeyboard from '../hooks/useKeyboard';
import { useDialogContext } from '../providers/DialogContextProvider';
import { SxProps } from '@mui/system';
import { useBoardContext } from '../providers/BoardContextProvider';

interface BoardProps {
  sx?: SxProps;
}

const Board = ({ sx }: BoardProps): React.ReactNode => {
  const isCtrlDown = useKeyboard((event) => event.key === 'Control');
  const { isOpen: isDialogOpen } = useDialogContext();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { columns, isColumn, getColumnById, moveTask, moveColumn } = useBoardContext();

  const sensors = useSensors(
    useSensor(MouseSensor)
  );

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    if (activeId && isColumn(activeId)) {
      return closestCenter({
        ...args,
        droppableContainers:
          args.droppableContainers
            .filter(container => columns.includes(container.id as string))
      });
    }

    return closestCenter(args);
  };

  return (
    <Stack direction='row' gap={2} paddingBlock={2} sx={{ height: 'fit-content', ...sx }}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragOver={({ over }) => {
          if (!over || !activeId) return;
          const overId = over.id as string;

          if (isColumn(activeId)) {
            moveColumn(activeId, overId);
          } else {
            const activeColumn = getColumnById(activeId);
            const overColumn = getColumnById(overId);

            if (!activeColumn || !overColumn) return;
            moveTask(activeId, overId, activeColumn, overColumn);
          }
        }}
        onDragStart={({ active }) => {
          setActiveId(active.id as string);
        }}
        onDragEnd={() => {
          setActiveId(null);
        }}
      >
        <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
          {columns.map(column => <Column key={column} id={column} />)}
          {isCtrlDown && !isDialogOpen && activeId === null && <NewColumn />}
        </SortableContext>
        <DragOverlay>
          {activeId
            ? isColumn(activeId)
              ? <Column id={activeId} />
              : <Task id={activeId} />
            : null}
        </DragOverlay>
      </DndContext>
    </Stack>
  );
};

export default Board;