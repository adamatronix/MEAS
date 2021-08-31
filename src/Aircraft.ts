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

  constructor(position:PositionObject,heading?:number) {
    this.engine = new Engine(2,2);
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
    const headingInRadians = this.heading * Math.PI / 180;
    const speed = this.engine.speed;
    const vx = Math.cos(headingInRadians)*speed/30;
    const vy = Math.sin(headingInRadians)*speed/30;

    this.position.x += vx;
    this.position.y += vy;

  }
}

export default Aircraft;