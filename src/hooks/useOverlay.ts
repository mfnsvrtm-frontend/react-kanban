import { useState } from 'react';

export type OverlayOverride = 'always-on' | 'always-off' | 'hover';

const useOverlay = (override?: OverlayOverride) => {
  override ??= 'hover';
  
  const [hasHover, setHasHover] = useState(override === 'always-on');

  const onMouseEnter = override === 'hover' ? () => setHasHover(true) : noop;
  const onMouseLeave = () => setHasHover(false);

  return {
    hasHover,
    callbacks: {
      onMouseEnter,
      onMouseLeave 
    }
  };
}

const noop = () => { };

export default useOverlay;