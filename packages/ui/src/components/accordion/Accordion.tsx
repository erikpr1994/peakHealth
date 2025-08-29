'use client';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import './accordion.css';

interface AccordionProps extends ComponentProps<'details'> {}

const AccordionContent: FC<PropsWithChildren<ComponentProps<'div'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('content', className)} {...props}>
      {children}
    </div>
  );
};

AccordionContent.displayName = 'Accordion.Content';

const AccordionHeader: FC<PropsWithChildren<ComponentProps<'summary'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <summary className={clsx('header', className)} {...props}>
      {children}
    </summary>
  );
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
