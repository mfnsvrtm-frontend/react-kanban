import { useEffect, useRef, useState } from 'react';
import { Id } from '../types';
import { useDndContext } from '@dnd-kit/core';

export type OverlayOverride = 'always-on' | 'always-off' | 'hover';

const useHover = (id?: Id) => {
  const { active } = useDndContext();
  const [hasHover, setHasHover] = useState(false);
  const styleSheet = useRef<CSSStyleSheet | null>(null);

  useEffect(() => {
    styleSheet.current = new CSSStyleSheet();
  }, [])

  useEffect(() => {
    setHasHover(false);
  }, [active])

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
}

const noop = () => { };

export default useHover;