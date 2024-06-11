import { useEffect, useRef, useState } from 'react';

type MousePredicate = (event: MouseEvent) => boolean;

export const useMousePredicate = (predicate: MousePredicate) => {
  const internalValue = useRef(false);
  const [value, setValue] = useState(false);

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      const currentValue = predicate(event)
      if (currentValue != internalValue.current) {
        internalValue.current = currentValue;
        setValue(currentValue);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {window.removeEventListener('mousemove', updateMousePosition); console.log('remove')};
  }, []);

  return value;
};