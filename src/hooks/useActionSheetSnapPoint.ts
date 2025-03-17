import {useState, useMemo} from 'react';

// Only used when ActionSheet height is dependent on the container (uses %)

export const useActionSheetSnapPoint = (heightPercentage: number) => {
  const [sheetContainerHeight, setSheetContainerHeight] = useState(1);
  const [sheetChildrenHeight, setSheetChildrenHeight] = useState(1);

  // const snapPoint =
  //   (sheetChildrenHeight / (sheetContainerHeight * (heightPercentage / 100))) *
  //   100;

  const snapPoint = useMemo(() => {
    return (
      (sheetChildrenHeight /
        (sheetContainerHeight * (heightPercentage / 100))) *
      100
    );
  }, [sheetChildrenHeight, sheetContainerHeight, heightPercentage]);

  return {
    sheetContainerHeight,
    setSheetContainerHeight,
    sheetChildrenHeight,
    setSheetChildrenHeight,
    snapPoint,
  };
};
