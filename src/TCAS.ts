import { intersect } from './utils/intersect';
import { distanceOfLine } from './utils/distanceOfLine';
import Aircraft from './Aircraft';

class TCAS {
  airTraffic:any;
  origin:Aircraft;

  constructor(origin:Aircraft, airTraffic:any) {
    this.airTraffic = airTraffic;
    this.origin = origin;
  }

  scan = () => {
    this.airTraffic.forEach((aircraft:Aircraft) => {
      const callsign = aircraft.callsign;
      if(callsign !== this.origin.callsign && aircraft.flightPath && this.origin.flightPath) {
        const conflict = intersect( 
          this.origin.flightPath.x1,
          this.origin.flightPath.y1,
          this.origin.flightPath.x2,
          this.origin.flightPath.y2, 
          aircraft.flightPath.x1, 
          aircraft.flightPath.y1, 
          aircraft.flightPath.x2, 
          aircraft.flightPath.y2
        );

        if(conflict) {
          // On a similar flight path and so we must determine if they are on a collision course.
          const originToCollision = distanceOfLine(this.origin.position.x,this.origin.position.y,conflict.x,conflict.y);
          const otherCollision = distanceOfLine(aircraft.position.x,aircraft.position.y,conflict.x,conflict.y);

          if(originToCollision < 40 && otherCollision < 40) {
            console.log('IMMINENT COLLISION');
          }
        }
        
      }
    })
  }

}

export default TCAS;