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
  heading:number = getRandomInt(0,360);
  radiansHeading:number = this.heading * Math.PI / 180;
  airTraffic:any;

  constructor(position:PositionObject, airTraffic:any, heading?:number) {
    const speed = getRandomInt(5,30);
    this.airTraffic = airTraffic;
    this.tcas = new TCAS(this,airTraffic);
    this.fans = new FANS(this);
    this.engine = new Engine(1/10,speed,speed);
    this.position = position;

    if(heading) {
      this.heading = heading;
    }
  }

  update = () => {
    this.fans.update();
    this.engine.update();
    this.tcas.scan(this.collisionManoeuver);
    /**
     * Update aircraft position based on heading and speed
     */
    const speed = this.engine.speed;
    const vx = Math.cos(this.radiansHeading)*speed/30;
    const vy = Math.sin(this.radiansHeading)*speed/30;

    this.position.x += vx;
    this.position.y += vy;

  }

  collisionManoeuver = (conflictPoint:PositionObject, direction:string) => {
    this.heading = direction === 'left' ? this.heading - .25 : this.heading + .25;
    this.radiansHeading = this.heading * Math.PI / 180;
    console.log(`${this.callsign} chaning heading to ${this.heading}`)
  }

}

export default Aircraft;