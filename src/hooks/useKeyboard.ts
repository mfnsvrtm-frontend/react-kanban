import { useEffect, useState } from 'react';

const useKeyboard = (predicate: (event: KeyboardEvent) => boolean) => {
  const [keyDownEvent, setKeyDownEvent] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (predicate(event)) setKeyDownEvent(event);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (predicate(event)) setKeyDownEvent(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keyDownEvent;
};

export default useKeyboard;