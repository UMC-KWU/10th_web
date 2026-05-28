import { useState } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  //setIsOpen에서
  //isOpen: true -> open, isOpen: false -> close
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    setIsOpen(true);
  };
  
  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, toggle, open, close };
};
