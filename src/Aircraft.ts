import { getRandomInt } from "./utils/getRandomInt";
import short from 'short-uuid';
import TCAS from "./TCAS";
import FANS from "./FANS";
import Engine from "./Engine";

interface PositionObject {
  x:number,
  y:number
}

class Aircraft {
  tcas:TCAS;
  fans:FANS;
  icon:number = getRandomInt(0,3);
  engine:Engine;
  position:PositionObject;
  callsign:string = short.generate().substring(0,4).toUpperCase();
  airTraffic:any;

  constructor(position:PositionObject, airTraffic:any) {
    const speed = getRandomInt(5,30);
    this.airTraffic = airTraffic;
    this.tcas = new TCAS(this,airTraffic);
    this.fans = new FANS(this);
    this.engine = new Engine(1/10,speed,speed);
    this.position = position;
  }

  update = () => {
    this.fans.update();
    this.engine.update();
    this.tcas.scan(this.fans.collisionManoeuver);
    /**
     * Update aircraft position based on heading and speed
     */
    const speed = this.engine.speed;
    const vx = Math.cos(this.fans.radiansHeading)*speed/30;
    const vy = Math.sin(this.fans.radiansHeading)*speed/30;

    this.position.x += vx;
    this.position.y += vy;

  }
}

export default Aircraft;