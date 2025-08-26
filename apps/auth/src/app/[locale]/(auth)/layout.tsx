import React from 'react';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return <div className="auth-container">{children}</div>;
};

export default AuthLayout;
