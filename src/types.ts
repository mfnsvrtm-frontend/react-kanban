export type Id = string;

export interface TaskData {
  title: string;
  description: string;
}

export interface TaskDataMap {
  [itemId: Id]: TaskData;
}

export interface ColumnData {
  title: string;
}

export interface ColumnDataMap {
  [columnId: Id]: ColumnData;
}

export interface Board {
  [columnId: Id]: Id[];
}