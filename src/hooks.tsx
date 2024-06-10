import { useState } from "react";

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
