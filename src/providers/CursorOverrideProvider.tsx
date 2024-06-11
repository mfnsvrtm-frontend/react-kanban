import { PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react';

const initialStylesheet = new CSSStyleSheet();

// https://github.com/react-dnd/react-dnd/issues/325
const overrideRule = 'body * { cursor: grabbing !important; user-select: none }';

interface CursorOverrideContext {
  override: () => void;
  clear: () => void;
}

const globalStyleContext = createContext<CursorOverrideContext | null>(null);

export const useCursorOverride = (): CursorOverrideContext => {
  const context = useContext(globalStyleContext);

  if (!context)
    throw new Error('Attempted to call useCursorOverride outside of CursorOverrideProvider');

  return context;
};

export const CursorOverrideProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const styleSheet = useRef(initialStylesheet);

  useEffect(() => {
    document.adoptedStyleSheets.push(styleSheet.current);
    () => {
      document.adoptedStyleSheets =
        document.adoptedStyleSheets
          .filter(sheet => sheet != styleSheet.current);
    };
  }, []);

  const override = () => {
    if (styleSheet.current.cssRules.length === 0)
      styleSheet.current.insertRule(overrideRule);
  };
  const clear = () => {
    if (styleSheet.current.cssRules.length === 1)
      styleSheet.current.deleteRule(0);
  };

  return (
    <globalStyleContext.Provider value={{ override, clear }} >
      {children}
    </globalStyleContext.Provider>
  );
};

export default CursorOverrideProvider;