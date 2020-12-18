export function Container({ children }) {
  return (
    <div className="md:container md:mx-auto min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
