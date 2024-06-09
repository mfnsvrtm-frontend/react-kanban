import { useState } from 'react';

const useHover = (hoverOverride: boolean) => {
  const [hasHover, setHasHover] = useState(hoverOverride);

  const onMouseEnter = hoverOverride ? noop : () => setHasHover(true);
  const onMouseLeave = hoverOverride ? noop : () => setHasHover(false);
  const style = { position: 'relative' };

  return {
    hasHover,
    style,
    callbacks: {
      onMouseEnter,
      onMouseLeave 
    }
  };
}

const noop = () => { };

export default useHover;