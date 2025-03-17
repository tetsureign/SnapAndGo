import {useState, useMemo} from 'react';

export const useActionSheetInitPoint = (minimumHeight: number) => {
  const [sheetChildrenHeight, setSheetChildrenHeight] = useState(1);

  const initSnapPoint = useMemo(() => {
    return (minimumHeight / sheetChildrenHeight) * 100;
  }, [sheetChildrenHeight, minimumHeight]);

  return {
    sheetChildrenHeight,
    setSheetChildrenHeight,
    initSnapPoint,
  };
};
