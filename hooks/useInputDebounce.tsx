import { useEffect, useState } from "react";

export function useInputDebounce(
  time = 500
): [string, (value: string) => void, string] {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return [value, setValue, debouncedValue];
}
