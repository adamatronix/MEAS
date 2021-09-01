import { intersect } from './utils/intersect';
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
          console.log(`${this.origin.callsign} is on the flight path of ${callsign}`);
        }
        
      }
    })
  }

}

export default TCAS;