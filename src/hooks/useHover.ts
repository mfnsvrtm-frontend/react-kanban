import { useEffect, useState } from 'react';
import { Id } from '../types';
import { useDndContext } from '@dnd-kit/core';
import { useCursorOverride } from '../providers/CursorOverrideProvider';

const useHover = (id?: Id) => {
  const { active } = useDndContext();
  const [hasHover, setHasHover] = useState(false);
  const { override, clear } = useCursorOverride();

  useEffect(() => {
    setHasHover(false);
    if (active)
      override();
    else
      clear();
    return clear;
  }, [active === null]);

  let onMouseEnter;
  let onMouseLeave;
  if (!id || !active) {
    onMouseEnter = () => setHasHover(true);
    onMouseLeave = () => setHasHover(false);
  } else {
    onMouseEnter = () => { };
    onMouseLeave = () => { };
  }

  return {
    hasHover,
    callbacks: {
      onMouseEnter,
      onMouseLeave
    }
  };
};

export default useHover;