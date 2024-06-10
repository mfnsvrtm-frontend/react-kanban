import { Stack } from '@mui/material';
import Column from './Column';
import Task from './Task';
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { MouseSensor } from '../utils/sensors';
import { useBoardContext } from './BoardContextProvider';

const Board = (): React.ReactNode => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const { columns, isColumn, getColumnById, moveTask, moveColumn } = useBoardContext();

  const sensors = useSensors(
    useSensor(MouseSensor)
  );

  return (
    <Stack direction='row' gap={2} height={1} paddingBlock={2}>
      <DndContext
        sensors={sensors}
        onDragOver={({ active, over }) => {
          if (!over || !activeId) return;
          if (isColumn(activeId)) return;

          const overId = over.id as string;

          const activeColumn = getColumnById(activeId);
          const overColumn = getColumnById(overId);

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
        </SortableContext>
        <DragOverlay>
          {activeId
            ? isColumn(activeId)
              ? <Column id={activeId} />
              : <Task hover id={activeId} />
            : null}
        </DragOverlay>
      </DndContext>
    </Stack >
  );
};

export default Board;