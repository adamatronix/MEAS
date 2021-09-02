interface PositionObject {
  x:number,
  y:number
}

class Engine {
  frameRate:number = 1/30;
  Cd:number = 0.47;
  rho:number = 1.22;
  A:number = Math.PI * 8 * 8 / (10000);
  ag:number = 9.81; //9.81 earth's gravity
  restitution:number = -0.7;
  mass:number = 1; // kg
  position:PositionObject = { x: 0, y: 0};
  speed:number;
  nm:number;

  constructor(frameRate:number, speed?:number,nm?:number) {
    this.frameRate = frameRate;
    
    if(speed) {
      this.speed = speed;
    }

    if(nm) {
      this.nm = nm;
    }
  }

  update = () => {
    // Drag force: Fd = -1/2 * Cd * A * rho * v * v
    let F = -0.5 * this.Cd * this.A * this.rho * this.speed * this.speed * this.speed / Math.abs(this.speed);
    F = (isNaN(F) ? 0 : F);

    // Calculate acceleration ( F = ma )
    let acceleration = F / this.mass;
    if(this.nm && this.speed < this.nm) {
      acceleration = 0.05;
    }
    this.speed += acceleration*this.frameRate;

  }

}

export default Engine;