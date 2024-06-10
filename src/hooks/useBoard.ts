import { nanoid } from 'nanoid';
import { Board, ColumnData, ColumnDataMap, Id, TaskData, TaskDataMap } from '../types';
import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export interface BoardContext {
  columns: Id[];
  isColumn: (columnId: Id) => boolean;
  getColumnTasks: (columnId: Id) => Id[];
  getColumnData: (columnId: Id) => ColumnData;
  getTaskData: (taskId: Id) => TaskData;
  getColumnById: (id: Id) => Id | undefined;
  moveTask: (id: Id, to: Id, fromColumnId: Id, toColumnId: Id) => void;
  moveColumn: (id: Id, to: Id) => void;
  deleteTask: (id: Id) => void;
  deleteColumn: (id: Id) => void;
  addTask: (columnId: Id, data: TaskData) => void;
  editTask: (taskId: Id, data: TaskData) => void;
}

export const useBoard = (): BoardContext => {
  const [columns, setColumns] = useState<Id[]>(() => [nanoid(), nanoid()]);
  const [board, setBoard] = useState<Board>(() => ({
    [columns[0]]: [nanoid(), nanoid(), nanoid()],
    [columns[1]]: [nanoid(), nanoid(), nanoid()],
  }));
  const [columnData, setColumnData] = useState<ColumnDataMap>(() => ({
    [columns[0]]: { title: 'In Progress' },
    [columns[1]]: { title: 'Done' },
  }));
  const [taskData, setTaskData] = useState<TaskDataMap>(() => ({
    [board[columns[0]][0]]: { title: 'title1', description: 'description1' },
    [board[columns[0]][1]]: { title: 'title2', description: 'description2' },
    [board[columns[0]][2]]: { title: 'title3', description: 'description3' },
    [board[columns[1]][0]]: { title: 'title a', description: 'description a' },
    [board[columns[1]][1]]: { title: 'title b', description: 'description b' },
    [board[columns[1]][2]]: { title: 'title c', description: 'description c' },
  }));

  const isColumn = (columnId: Id) => columns.includes(columnId);
  const getColumnTasks = (columnId: Id) => board[columnId];
  const getColumnData = (columnId: Id) => columnData[columnId];
  const getTaskData = (taskId: Id) => taskData[taskId];

  const getColumnById = (id: Id) => {
    if (id in board) return id;
    return Object.keys(board).find(key => board[key].includes(id));
  };

  const getItemIndex = (itemId: Id, columnId: Id) => {
    return board[columnId].indexOf(itemId);
  };

  const moveTask = (id: Id, to: Id, fromColumnId: Id, toColumnId: Id) => {
    const activeColumn = fromColumnId;
    const overColumn = toColumnId;

    const activeIndex = getItemIndex(id, activeColumn);
    const overIndex = (to === overColumn) ? board[to].length : getItemIndex(to, overColumn);

    if (activeColumn !== overColumn) {
      setBoard({
        ...board,
        [activeColumn]: board[activeColumn].filter(item => item !== id),
        [overColumn]: [...board[overColumn].slice(0, overIndex), board[activeColumn][activeIndex], ...board[overColumn].slice(overIndex)]
      });
    } else {
      setBoard({
        ...board,
        [activeColumn]: arrayMove(board[activeColumn], activeIndex, overIndex),
      });
    }
  };

  const moveColumn = (id: Id, to: Id) => {
    const activeIndex = columns.indexOf(id);
    const overIndex = columns.indexOf(to);
    setColumns(arrayMove(columns, activeIndex, overIndex));
  };

  const deleteTask = (id: Id) => {
    const columnId = getColumnById(id);
    if (!columnId) return;

    setBoard({
      ...board,
      [columnId]: board[columnId].filter(task => task !== id)
    });
    
    const { [id]: _, ...newData } = taskData;
    setTaskData(newData); 
  }

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter(column => column !== id));
    
    const { [id]: _1, ...newColumnData } = columnData;
    setColumnData(newColumnData);

    const { [id]: _2, ...newBoard } = board;
    setBoard(newBoard);

    const columnTasks = board[id];
    const newTaskData = Object.fromEntries(
      Object.entries(taskData)
      .filter(([task]) => !columnTasks.includes(task))
    );
    setTaskData(newTaskData);
  }

  const addTask = (columnId: Id, data: TaskData) => {
    const id = nanoid();

    setBoard({
      ...board,
      [columnId]: [...board[columnId], id]
    });

    setTaskData({
      ...taskData,
      [id]: data
    });
  }

  const editTask = (taskId: Id, data: TaskData) => {
    setTaskData({
      ...taskData,
      [taskId]: data
    });
  }

  return {
    columns,
    isColumn,
    getColumnTasks,
    getColumnData,
    getTaskData,
    getColumnById,
    moveTask,
    moveColumn,
    deleteTask,
    deleteColumn,
    addTask,
    editTask,
  };
};