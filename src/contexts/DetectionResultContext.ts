import React, {createContext} from 'react';

type SelectedResult = {
  result: string;
  index: number;
};
type SelectedResultContextType = {
  selectedResult: SelectedResult;
  setSelectedResult: (value: React.SetStateAction<SelectedResult>) => void;
  // Below is a fancier way of doing the same thing as above. Keeping for learning purposes.
  // setSelectedResult: React.Dispatch<React.SetStateAction<SelectedResult>>;
  resizeRatio?: number;
};

export const SelectedResultContext = createContext<SelectedResultContextType>({
  selectedResult: {result: '', index: -1},
  setSelectedResult: () => {}, // Placeholder function to avoid errors
  resizeRatio: 1,
});
