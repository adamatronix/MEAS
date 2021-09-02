import Aircraft from './Aircraft';
import { getRandomInt } from './utils/getRandomInt';

interface FlightPathObject {
  x1:number,
  y1:number,
  x2:number,
  y2:number
}

interface PositionObject {
  x:number,
  y:number
}

/**
 * Future Aircraft Navigation System
 */
class FANS {
  aircraft:Aircraft;
  flightPath:FlightPathObject;
  heading:number;
  radiansHeading:number;

  constructor(aircraft:Aircraft) {
    this.aircraft = aircraft;
    this.setHeading(getRandomInt(0,360));
  }

  update = () => {
    this.calcFlightPath();
  }

  calcFlightPath = () => {
    // Get the endpoints based on the current flight position, heading, and distance we want to start calculating.
    const x1 = this.aircraft.position.x;
    const y1 = this.aircraft.position.y;
    const x2 = x1 + Math.cos(this.radiansHeading) * 400;
    const y2 = y1 + Math.sin(this.radiansHeading) * 400;

    this.flightPath = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }
  }

  setHeading = (degree:number) => {
    this.heading = degree;
    this.radiansHeading = this.heading * Math.PI / 180;
  }

  collisionManoeuver = (conflictPoint:PositionObject, direction:string) => {
    this.setHeading(direction === 'left' ? this.heading - 2 : this.heading + 2);
  }
}

export default FANS;