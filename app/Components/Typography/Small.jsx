export default function Small({ className, children }) {
  return (
    <small className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </small>
  );
}
