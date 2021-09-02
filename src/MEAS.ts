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
      p5.pixelDensity(2);
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 1);
      p5.frameRate(30);
    }

    p5.mousePressed = function () {
      const aircraft = new Aircraft({x: p5.mouseX, y: p5.mouseY}, self.allAircraft);
      self.allAircraft.push(aircraft);
    }

    p5.draw = () => {
      p5.clear();
      if(this.allAircraft.length > 0) {
        this.allAircraft.forEach((aircraft:Aircraft) => {
          aircraft.update();
          //Draw Icon
          const icons:any = {
            0: (size:number) => {
              return p5.rect(aircraft.position.x - size/2, aircraft.position.y - size/2, size, size);
            },
            1: (size:number) => {
              return p5.circle(aircraft.position.x, aircraft.position.y, size+4);
            },
            2: (size:number) => {
              return p5.triangle(aircraft.position.x - (size/2) - 4, aircraft.position.y + size/2, aircraft.position.x, aircraft.position.y - size/2, aircraft.position.x+(size/2)+4, aircraft.position.y + size/2);
            }
          }
          p5.strokeWeight(2);
          icons[aircraft.icon](20);

          p5.strokeWeight(1);
          p5.textFont('monospace');
          p5.textSize(12);
          p5.text(aircraft.callsign, aircraft.position.x + 10, aircraft.position.y - 10);
          const x = Math.round(aircraft.position.x * 100) / 100;
          const y = Math.round(aircraft.position.y * 100) / 100;
          p5.text(`${x},${y}`, aircraft.position.x + 10, aircraft.position.y + 10);

          const speed = Math.round(aircraft.engine.speed * 100) / 100;
          p5.text(`${speed}nm`, aircraft.position.x + 10, aircraft.position.y + 30);

          const x2 = x + Math.cos(aircraft.radiansHeading) * 50;
          const y2 = y + Math.sin(aircraft.radiansHeading) * 50;

          p5.line(x+1,y+1,x2+1,y2+1);
        });
      }
    }

  }

}

export default MEAS;