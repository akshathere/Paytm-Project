

export function Card({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="p-4"
    >
      
      {children}
    </div>
  );
}