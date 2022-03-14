import { useState } from "react";

export const useDebounce = () => {
  const [timer, setTimer] = useState(0);
  const debounce = (callback, data) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      callback(...data);
    }, 800);
    setTimer(newTimer);
  };
  return debounce;
};
