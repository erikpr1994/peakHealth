import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps): React.JSX.Element => {
  return children as React.JSX.Element;
};

export default AuthLayout;
