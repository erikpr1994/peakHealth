const RoutinesLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>): React.ReactElement => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default RoutinesLayout;
