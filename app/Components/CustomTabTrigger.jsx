import { forwardRef } from "react";

const CustomTabTrigger = forwardRef(({ onClick, ...props }, ref) => {
  // Handle the click event
  const handleClick = (event) => {
    event.preventDefault();
    // Call the onClick handler only when clicked
    if (onClick) onClick(event);
  };

  return (
    <button
      ref={ref}
      role="tab"
      onMouseDown={(e) => e.preventDefault()} // Prevent default behavior on mousedown
      onClick={handleClick} // Trigger only on click
      {...props}
    />
  );
});

export default CustomTabTrigger;
