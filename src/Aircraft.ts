import { getRandomInt } from "./utils/getRandomInt";
import short from 'short-uuid';
import Engine from "./Engine";

interface PositionObject {
  x:number,
  y:number
}

class Aircraft {
  engine:Engine;
  position:PositionObject;
  callsign:string = short.generate().substring(0,4).toUpperCase();
  heading:number = getRandomInt(0,360);
  radiansHeading:number = this.heading * Math.PI / 180;

  constructor(position:PositionObject,heading?:number) {
    const speed = getRandomInt(2,10);
    this.engine = new Engine(speed,speed);
    this.position = position;

    if(heading) {
      this.heading = heading;
    }
  }

  update = () => {
    this.engine.update();

    /**
     * Update aircraft position based on heading and speed
     */
    const speed = this.engine.speed;
    const vx = Math.cos(this.radiansHeading)*speed/30;
    const vy = Math.sin(this.radiansHeading)*speed/30;

    this.position.x += vx;
    this.position.y += vy;

  }
}

export default Aircraft;