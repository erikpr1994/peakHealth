'use client';

import {
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import './accordion.css';

interface AccordionContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionContext = createContext<AccordionContextProps | undefined>(
  undefined
);

const useAccordionContext = (): AccordionContextProps => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'useAccordionContext must be used within an Accordion component'
    );
  }
  return context;
};

interface AccordionProps extends ComponentProps<'div'> {
  // Add any additional props here
}

const AccordionContent: FC<PropsWithChildren<AccordionProps>> = ({
  children,
}): ReactNode => {
  const { isOpen } = useAccordionContext();
  return isOpen ? <div className="content">{children}</div> : null;
};

AccordionContent.displayName = 'Accordion.Content';

const AccordionHeader: FC<PropsWithChildren<AccordionProps>> = ({
  children,
}): ReactNode => {
  const { toggle } = useAccordionContext();
  return (
    <div className="header" onClick={toggle}>
      {children}
    </div>
  );
};

AccordionHeader.displayName = 'Accordion.Header';

const Accordion: FC<PropsWithChildren<AccordionProps>> & {
  Header: FC<PropsWithChildren<AccordionProps>>;
  Content: FC<PropsWithChildren<AccordionProps>>;
} = ({ children }): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prevOpen => !prevOpen);
  }, []);

  const value = useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);

  return (
    <AccordionContext.Provider value={value}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = 'Accordion';
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
