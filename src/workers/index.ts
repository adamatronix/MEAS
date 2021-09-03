import { expose } from 'comlink';
import { intersect } from '../utils/intersect';
import { distanceOfLine } from '../utils/distanceOfLine';
import { bezierCurve } from '../utils/bezierCurve';

const TCASScan = (data:any) => {

  const origin = {
    callsign: data.originCallsign,
    fans: {
      flightPath: data.originPath
    },
    position: data.originPos
  }

  const aircraft = {
    callsign: data.otherCallsign,
    fans: {
      flightPath: data.otherPath
    },
    position: data.otherPos
  }

  let closeProximityCraft:boolean = false;
  let direction = null;
  let conflict:any = false;

    const callsign = aircraft.callsign;
    if(callsign !== origin.callsign && aircraft.fans.flightPath && origin.fans.flightPath) {
      conflict = intersect( 
        origin.fans.flightPath.x1,
        origin.fans.flightPath.y1,
        origin.fans.flightPath.x2,
        origin.fans.flightPath.y2, 
        aircraft.fans.flightPath.x1, 
        aircraft.fans.flightPath.y1, 
        aircraft.fans.flightPath.x2, 
        aircraft.fans.flightPath.y2
      );
      
      const originToOther = distanceOfLine(origin.position.x,origin.position.y,aircraft.position.x,aircraft.position.y);
      if(originToOther < 200) {
        closeProximityCraft = true;
      } else if(originToOther >= 200) {
        closeProximityCraft = false;
      }

      if(conflict) {
        // On a similar flight path and so we must determine if they are on a collision course.
        const originToCollision = distanceOfLine(origin.position.x,origin.position.y,conflict.x,conflict.y);
        const otherCollision = distanceOfLine(aircraft.position.x,aircraft.position.y,conflict.x,conflict.y);


        if(originToCollision < 200 && otherCollision < 200) {
          if(origin.position.x > aircraft.position.x) {
            direction = 'left';
          } else {
            direction = 'right';
          }
          // imminent collision
        }
      }
      
    }


  return {
    conflict: conflict,
    direction: direction,
    closeProximityCraft: closeProximityCraft
  };
}

const CalculateBezierDistance = (x1:number, y1:number, x2:number, y2:number, x3:number, y3:number) => {
  let t = 0;
  let curveDistance = 0;
  let cachedPos; 
  while(t < 1) {
    const results = bezierCurve(t,x1,y1,x2,y2,x3,y3);
    if(cachedPos) {
      curveDistance += distanceOfLine(cachedPos.x,cachedPos.y,results.x,results.y);
    }
    cachedPos = results;
    t += 0.001;
  }

  return curveDistance;
}



const exports = {
    intersect,
    TCASScan,
    CalculateBezierDistance
};

expose(exports);