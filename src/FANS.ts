import Aircraft from './Aircraft';

interface FlightPathObject {
  x1:number,
  y1:number,
  x2:number,
  y2:number
}

/**
 * Future Aircraft Navigation System
 */
class FANS {
  aircraft:Aircraft;
  flightPath:FlightPathObject;

  constructor(aircraft:Aircraft) {
    this.aircraft = aircraft;
  }

  update = () => {
    this.calcFlightPath();
  }

  calcFlightPath = () => {
    // Get the endpoints based on the current flight position, heading, and distance we want to start calculating.
    const x1 = this.aircraft.position.x;
    const y1 = this.aircraft.position.y;
    const x2 = x1 + Math.cos(this.aircraft.radiansHeading) * 400;
    const y2 = y1 + Math.sin(this.aircraft.radiansHeading) * 400;

    this.flightPath = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }
  }
}

export default FANS;