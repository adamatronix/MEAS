import * as P5 from 'p5';
import { getRandomInt } from "./utils/getRandomInt";
import short from 'short-uuid';
import Engine from "./Engine";
import { bezierCurve } from './utils/bezierCurve';

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
  allAircraft:any;

  constructor(position:PositionObject, allAircraft:any) {
    const speed = getRandomInt(5,30);
    this.engine = new Engine(1/10,speed,speed);
    this.position = position;
    this.allAircraft = allAircraft;
  }

  update = (p5:P5) => {
    this.engine.update();
    if(this.allAircraft[this.allAircraft.length-1]) {
      let target = this.allAircraft[this.allAircraft.length-1];
      let t = 0;
      while(t < 1) {
        const results = bezierCurve(t,this.position.x,this.position.y,500,0,target.position.x,target.position.y);
        p5.circle(results.x,results.y,0.5);
        t += 0.006;
      }
    }
    
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