

export function Card({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="shadow-lg p-4">
      
      {children}
    </div>
  );
}