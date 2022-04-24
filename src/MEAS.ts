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
      p5.pixelDensity(0.8);
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', '0px');
      canvas.style('top', '0px');
      canvas.style('z-index', '1');
      p5.frameRate(60);
      p5.background('rgba(255,255,255,0)');
    }

    p5.mousePressed = function () {
      const aircraft = new Aircraft({x: p5.mouseX, y: p5.mouseY}, self.allAircraft);
      self.allAircraft.push(aircraft);
    }

    p5.draw = () => {
      p5.clear(255,255,255,0);
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
          p5.fill('rgba(255,255,255, 0)');
          p5.stroke(255, 255, 255);
          icons[aircraft.icon](20);

          p5.fill('rgba(255,255,255, 1)');
          p5.strokeWeight(1);
          p5.textFont('monospace');
          p5.textSize(16);
          p5.textStyle(p5.BOLD);
          p5.textAlign(p5.CENTER);
          //p5.text(aircraft.callsign, aircraft.position.x + 10, aircraft.position.y - 10);
          const x = Math.trunc(aircraft.position.x);
          const y = Math.trunc(aircraft.position.y);
          p5.text(`${x} ${y}`, aircraft.position.x - 70, aircraft.position.y - 30, 150);

          p5.textSize(12);
          const speed = Math.round(aircraft.engine.speed * 100) / 100;
          //p5.text(`${speed}nm`, aircraft.position.x + 10, aircraft.position.y + 30);

          const x2 = x + Math.cos(aircraft.fans.radiansHeading) * 50;
          const y2 = y + Math.sin(aircraft.fans.radiansHeading) * 50;

          //p5.line(x+1,y+1,x2+1,y2+1);

          
          let ctx = <CanvasRenderingContext2D> p5.drawingContext;
          ctx.setLineDash([5, 15]);
          Object.keys(aircraft.tcas.closeProximityCraft).forEach((callsign:string) => {
            const otherAircraft = aircraft.tcas.closeProximityCraft[callsign];
            p5.line(aircraft.position.x,aircraft.position.y,otherAircraft.position.x,otherAircraft.position.y);
          })
          ctx.setLineDash([]);
        });
      }
    }

  }

}

export default MEAS;