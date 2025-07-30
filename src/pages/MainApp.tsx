import React from "react";

interface MainAppProps {
  children: React.ReactNode;
}

export default function MainApp({ children }: MainAppProps) {
  return <main>{children}</main>;
}
