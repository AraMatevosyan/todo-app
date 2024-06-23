import {useEffect, useRef, useState} from "react";
import {StringParam, useQueryParam, withDefault} from "use-query-params";
import {State} from "./types";

export type SortOrder = "asc" | "desc" | undefined;

export const useSorting = <T extends unknown>() => {
  const [field, setField] = useState<T | undefined>();
  const [order, setOrder] = useState<SortOrder>();
  // const [lastClientSort, setLastClientSort] = useState<NewTableTypes.SortOrder>('ascend');
  const setNextOrder = () => {
    setOrder((currentOrder) => {
      if (currentOrder === "asc") return "desc";
      if (currentOrder === "desc") return undefined;
      return "asc";
    });
  };
  const update = (newField: T) => {
    if (field === newField) {
      setNextOrder();
      return;
    }

    setField(newField);
    setOrder("asc");
  };

  return { field, order, update };
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<number>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay) as any;

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useDebouncedQueryParam = (paramName: string, defaultValue='') => {
  const [queryParam, setQueryParam] = useQueryParam(paramName, withDefault(StringParam, defaultValue)) as State<string>;
  const debouncedValue = useDebounce(queryParam, 500);


  return [queryParam, debouncedValue, setQueryParam] as const;
};
