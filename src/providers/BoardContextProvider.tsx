import { PropsWithChildren, createContext, useContext } from 'react';
import { BoardContext } from '../hooks/useBoard';

const boardContext = createContext<BoardContext | null>(null);

export const useBoardContext = (): BoardContext => {
  const context = useContext(boardContext);

  if (!context)
    throw new Error('Attempted to call useBoardContext outside of BoardContextProvider');

  return context;
};

interface BoardContextProviderProps extends PropsWithChildren {
  context: BoardContext;
};

export const BoardContextProvider = ({ context, children }: BoardContextProviderProps): React.ReactNode => {
  return (
    <boardContext.Provider value={context}>
      {children}
    </boardContext.Provider>
  );
};