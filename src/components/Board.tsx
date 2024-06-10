import { Stack } from '@mui/material';
import Column from './Column';
import Task from './Task';
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { MouseSensor } from '../utils/sensors';
import { useBoard } from '../hooks/useBoard';
import { BoardContextProvider } from './BoardContextProvider';

const Board = (): React.ReactNode => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const context = useBoard();
  const { columns, isColumn, getColumnById, moveTask, moveColumn } = context;

  const sensors = useSensors(
    useSensor(MouseSensor)
  );

  return (
    <Stack direction='row' gap={2} height={1} paddingBlock={2}>
      <DndContext
        sensors={sensors}
        onDragOver={({ over }) => {
          if (!over || !activeId) return;
          if (isColumn(activeId)) return;

          const overId = over.id as string;

          const activeColumn = getColumnById(activeId);
          const overColumn = getColumnById(overId);

          if (!activeColumn || !overColumn) return;
          if (activeColumn !== overColumn)
            moveTask(activeId, overId, activeColumn, overColumn);
        }}
        onDragStart={({ active }) => {
          setActiveId(active.id as string);
        }}
        onDragEnd={({ over }) => {
          setActiveId(null);

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
      >
        <BoardContextProvider context={context}>
          <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
            {columns.map(column => <Column key={column} id={column} />)}
          </SortableContext>
          <DragOverlay>
            {activeId
              ? isColumn(activeId)
                ? <Column id={activeId} />
                : <Task hover id={activeId} />
              : null}
          </DragOverlay>
        </BoardContextProvider>
      </DndContext>
    </Stack >
  );
};

export default Board;