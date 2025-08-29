'use client';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import './accordion.css';

interface AccordionProps extends ComponentProps<'details'> {}

const AccordionContent: FC<PropsWithChildren<ComponentProps<'div'>>> = ({
  children,
}) => {
  return <div className="content">{children}</div>;
};

AccordionContent.displayName = 'Accordion.Content';

const AccordionHeader: FC<PropsWithChildren<ComponentProps<'summary'>>> = ({
  children,
}) => {
  return <summary className="header">{children}</summary>;
};

AccordionHeader.displayName = 'Accordion.Header';

const Accordion: FC<PropsWithChildren<AccordionProps>> & {
  Header: FC<PropsWithChildren<ComponentProps<'summary'>>>;
  Content: FC<PropsWithChildren<ComponentProps<'div'>>>;
} = ({ children, ...props }) => {
  return (
    <details className="accordion" {...props}>
      {children}
    </details>
  );
};

Accordion.displayName = 'Accordion';
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
