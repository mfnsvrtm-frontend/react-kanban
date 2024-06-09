import { useState } from 'react';

const useHover = (hoverOverride = false) => {
  const [hasHover, setHasHover] = useState(hoverOverride);

  const onMouseEnter = hoverOverride ? noop : () => setHasHover(true);
  const onMouseLeave = hoverOverride ? noop : () => setHasHover(false);

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