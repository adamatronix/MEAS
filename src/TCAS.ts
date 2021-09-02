import { intersect } from './utils/intersect';
import { distanceOfLine } from './utils/distanceOfLine';
import Aircraft from './Aircraft';

interface PositionObject {
  x:number,
  y:number
}

class TCAS {
  airTraffic:any;
  origin:Aircraft;
  closeProximityCraft:any = {};

  constructor(origin:Aircraft, airTraffic:any) {
    this.airTraffic = airTraffic;
    this.origin = origin;
  }

  scan = (collisionEvent?: (conflictPoint: PositionObject, direction:string) => void) => {
    this.airTraffic.forEach((aircraft:Aircraft) => {
      const callsign = aircraft.callsign;
      if(callsign !== this.origin.callsign && aircraft.fans.flightPath && this.origin.fans.flightPath) {
        const conflict = intersect( 
          this.origin.fans.flightPath.x1,
          this.origin.fans.flightPath.y1,
          this.origin.fans.flightPath.x2,
          this.origin.fans.flightPath.y2, 
          aircraft.fans.flightPath.x1, 
          aircraft.fans.flightPath.y1, 
          aircraft.fans.flightPath.x2, 
          aircraft.fans.flightPath.y2
        );

        const originToOther = distanceOfLine(this.origin.position.x,this.origin.position.y,aircraft.position.x,aircraft.position.y);
        if(originToOther < 200 && !this.closeProximityCraft[aircraft.callsign]) {
          this.closeProximityCraft[aircraft.callsign] = aircraft;
        } else if(originToOther >= 200 && this.closeProximityCraft[aircraft.callsign]) {
          delete this.closeProximityCraft[aircraft.callsign];
        }

        if(conflict) {
          // On a similar flight path and so we must determine if they are on a collision course.
          const originToCollision = distanceOfLine(this.origin.position.x,this.origin.position.y,conflict.x,conflict.y);
          const otherCollision = distanceOfLine(aircraft.position.x,aircraft.position.y,conflict.x,conflict.y);


          if(originToCollision < 200 && otherCollision < 200) {
            let direction = null;
            if(this.origin.position.x > aircraft.position.x) {
              direction = 'left';
            } else {
              direction = 'right';
            }
            // imminent collision
            collisionEvent(conflict, direction);
          }
        }
        
      }
    })
  }

}

export default TCAS;