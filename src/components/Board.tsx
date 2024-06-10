import { Stack } from '@mui/material';
import Column from './Column';
import Task from './Task';
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { MouseSensor } from '../utils/sensors';
import { BoardContextProvider } from '../providers/BoardContextProvider';
import { useBoard } from '../hooks/useBoard';
import NewColumn from './NewColumn';
import useKeyboard from '../hooks/useKeyboard';
import { useDialogContext } from '../providers/DialogContextProvider';

const Board = (): React.ReactNode => {
  const isCtrlDown = useKeyboard((event) => event.key === 'Control');
  const { isOpen: isDialogOpen } = useDialogContext();
  const [activeId, setActiveId] = useState<string | null>(null);

  const context = useBoard();
  const { columns, isColumn, getColumnById, moveTask, moveColumn } = context;

  const sensors = useSensors(
    useSensor(MouseSensor)
  );

  return (
    <BoardContextProvider context={context}>
      <Stack direction='row' gap={2} height={1} paddingBlock={2} sx={{ height: 'fit-content', width: 'fit-content', marginInline: 'auto' }}>
        <DndContext
          sensors={sensors}
          onDragOver={({ over }) => {
            if (!over || !activeId) return;
            if (isColumn(activeId)) return;

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
            {isCtrlDown && !isDialogOpen && <NewColumn />}
          </SortableContext>
          <DragOverlay>
            {activeId
              ? isColumn(activeId)
                ? <Column overlay id={activeId} />
                : <Task overlay id={activeId} />
              : null}
          </DragOverlay>
        </DndContext>
      </Stack >
    </BoardContextProvider>
  );
};

export default Board;