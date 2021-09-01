import { getRandomInt } from "./utils/getRandomInt";
import short from 'short-uuid';
import { intersect } from './utils/intersect';
import Engine from "./Engine";

interface PositionObject {
  x:number,
  y:number
}

interface FlightPathObject {
  x1:number,
  y1:number,
  x2:number,
  y2:number
}

class Aircraft {
  engine:Engine;
  position:PositionObject;
  callsign:string = short.generate().substring(0,4).toUpperCase();
  heading:number = getRandomInt(0,360);
  radiansHeading:number = this.heading * Math.PI / 180;
  airTraffic:any;
  flightPath: FlightPathObject;

  constructor(position:PositionObject, airTraffic:any, heading?:number) {
    const speed = getRandomInt(2,10);
    this.airTraffic = airTraffic;
    this.engine = new Engine(speed,speed);
    this.position = position;

    if(heading) {
      this.heading = heading;
    }
  }

  update = () => {
    this.engine.update();
    this.calcFlightPath();
    this.checkFlightPathsInAirSpace();

    /**
     * Update aircraft position based on heading and speed
     */
    const speed = this.engine.speed;
    const vx = Math.cos(this.radiansHeading)*speed/30;
    const vy = Math.sin(this.radiansHeading)*speed/30;

    this.position.x += vx;
    this.position.y += vy;

  }

  checkFlightPathsInAirSpace = () => {
    this.airTraffic.forEach((aircraft:Aircraft) => {
      const callsign = aircraft.callsign;
      if(callsign !== this.callsign && aircraft.flightPath) {
        const conflict = intersect( 
          this.flightPath.x1,
          this.flightPath.y1,
          this.flightPath.x2,
          this.flightPath.y2, 
          aircraft.flightPath.x1, 
          aircraft.flightPath.y1, 
          aircraft.flightPath.x2, 
          aircraft.flightPath.y2
        );

        if(conflict) {
          console.log(`${this.callsign} is on the flight path of ${callsign}`);
        }
        
      }
    })

  }

  calcFlightPath = () => {
    // Get the endpoints based on the current flight position, heading, and distance we want to start calculating.
    const x1 = this.position.x;
    const y1 = this.position.y;
    const x2 = x1 + Math.cos(this.radiansHeading) * 400;
    const y2 = y1 + Math.sin(this.radiansHeading) * 400;

    this.flightPath = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }
  }
}

export default Aircraft;