import { getRandomInt } from "./utils/getRandomInt";
import short from 'short-uuid';
import TCAS from "./TCAS";
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
  tcas:TCAS;
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
    this.tcas = new TCAS(this,airTraffic);
    this.engine = new Engine(speed,speed);
    this.position = position;

    if(heading) {
      this.heading = heading;
    }
  }

  update = () => {
    this.engine.update();
    this.calcFlightPath();
    this.tcas.scan();

    /**
     * Update aircraft position based on heading and speed
     */
    const speed = this.engine.speed;
    const vx = Math.cos(this.radiansHeading)*speed/30;
    const vy = Math.sin(this.radiansHeading)*speed/30;

    this.position.x += vx;
    this.position.y += vy;

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