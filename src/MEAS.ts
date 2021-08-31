import Aircraft from "./Aircraft";
class MEAS {
  plane:Aircraft;

  constructor() {
    this.plane = new Aircraft({x: 200, y: 200});
    this.update();
  }

  update = () => {
    this.plane.update();
    console.log(this.plane.position);
    requestAnimationFrame(this.update);
  }

}

export default MEAS;