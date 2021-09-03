import { findPointBetweenTwo } from './findPointBetweenTwo';

export const bezierCurveAngle = (t:number, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number) => {
  const percent = t;

  const point1 = findPointBetweenTwo(percent, x1, y1, x2, y2);
  const point2 = findPointBetweenTwo(percent, x2, y2, x3, y3);

	return { 
    p1: point1,
    p2: point2
  }
}