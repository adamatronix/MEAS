import * as P5 from 'p5';
import Aircraft from "./Aircraft";

class MEAS {
  container:HTMLDivElement;
  allAircraft:any = Array();

  constructor(container:HTMLDivElement) {
    this.container = container;
    new P5(this.sketch);
  }

  sketch = (p5: P5) => {
    const self = this;
    
    p5.setup = () => {
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 1);
      p5.frameRate(30);
    }

    p5.mousePressed = function () {
      const aircraft = new Aircraft({x: p5.mouseX, y: p5.mouseY});
      self.allAircraft.push(aircraft);
    }

    p5.draw = () => {
      if(this.allAircraft.length > 0) {
        this.allAircraft.forEach((aircraft:Aircraft) => {
          aircraft.update();
          p5.rect(aircraft.position.x, aircraft.position.y, 10, 10)
        });
      }
    }

  }

}

export default MEAS;