import React from "react";

export const useScroll = () => {
  const elRef = React.useRef(null);
  const executeScroll = () => elRef.current.scrollIntoView();

  return [executeScroll, elRef];
};
