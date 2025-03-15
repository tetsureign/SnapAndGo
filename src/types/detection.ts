export type DetectionResultType = {
  object: string;
  score: number;
  coordinate: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
};
