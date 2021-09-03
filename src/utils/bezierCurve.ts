export const bezierCurve = (t:number, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number) => {
  const x = Math.pow(1-t,2) * x1 + 2*(1-t) * t * x2 + Math.pow(t,2) * x3;
  const y = Math.pow(1-t,2) * y1 + 2*(1-t) * t * y2 + Math.pow(t,2) * y3;
	return { 
    x: x,
    y: y
  }
}