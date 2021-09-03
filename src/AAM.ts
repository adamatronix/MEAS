import { getRandomInt } from "./utils/getRandomInt";
import short from 'short-uuid';
import Engine from "./Engine";

interface PositionObject {
  x:number,
  y:number
}

/**
 * Air-to-Air Missile
 */
class AAM {
  callsign:string = short.generate().substring(0,4).toUpperCase();
  engine:Engine;
  icon:number = 3;
  position:PositionObject;

  constructor(position:PositionObject, allAircraft:any) {
    const speed = getRandomInt(5,30);
    this.engine = new Engine(1/10,speed,speed);
    this.position = position;
  }

  update = () => {
    this.engine.update();

    /**
     * Update aircraft position based on heading and speed
     */
    /*const speed = this.engine.speed;
    const vx = Math.cos(this.fans.radiansHeading)*speed/30;
    const vy = Math.sin(this.fans.radiansHeading)*speed/30;

    this.position.x += vx;
    this.position.y += vy;
    */
  }
}

export default AAM;