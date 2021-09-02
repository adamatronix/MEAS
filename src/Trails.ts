import * as P5 from 'p5';
import Aircraft from "./Aircraft";
import MEAS from './MEAS';

class Trails {
  container:HTMLDivElement;
  allAircraft:any = Array();

  constructor(container:HTMLDivElement, meas:MEAS) {
    this.container = container;
    this.allAircraft = meas.allAircraft;
    new P5(this.sketch);
  }

  sketch = (p5: P5) => {
    const self = this;
    
    p5.setup = () => {
      p5.pixelDensity(0.6);
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 0);
      p5.frameRate(10);
    }

    p5.draw = () => {
      if(this.allAircraft.length > 0) {
        this.allAircraft.forEach((aircraft:Aircraft) => {
          p5.stroke(255, 255, 255);
          p5.strokeWeight(1);
          p5.circle(aircraft.position.x, aircraft.position.y, 1);
        })
      }
    }

  }

}

export default Trails;