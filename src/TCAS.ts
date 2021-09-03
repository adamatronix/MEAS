import { wrap, proxy } from 'comlink';
import Aircraft from './Aircraft';

interface PositionObject {
  x:number,
  y:number
}

class TCAS {
  airTraffic:any;
  origin:Aircraft;
  closeProximityCraft:any = {};
  worker:Worker;
  workerApi:any;
  


  constructor(origin:Aircraft, airTraffic:any) {
    this.airTraffic = airTraffic;
    this.origin = origin;
    this.worker = new Worker(new URL("./workers/index.ts", import.meta.url));
    this.workerApi = wrap(this.worker); 
  }

  scan = async (collisionEvent?: (conflictPoint: PositionObject, direction:string) => void) => {
    this.airTraffic.forEach(async (aircraft:Aircraft) => {
      const data = {
        originCallsign: this.origin.callsign,
        otherCallsign: aircraft.callsign,
        originPath: Object.assign({},this.origin.fans.flightPath),
        otherPath: Object.assign({},aircraft.fans.flightPath),
        originPos: Object.assign({},this.origin.position),
        otherPos: Object.assign({},aircraft.position),
      }

      const results = await this.workerApi.TCASScan(data);

      if(results.conflict) {
        collisionEvent ? collisionEvent(results.conflict, results.direction) : null;
      }
      //console.log(results);
      if(results.closeProximityCraft && !this.closeProximityCraft[aircraft.callsign]) {
        this.closeProximityCraft[aircraft.callsign] = aircraft;
      } else if(!results.closeProximityCraft && this.closeProximityCraft[aircraft.callsign]) {
        delete this.closeProximityCraft[aircraft.callsign];
      }
 
    });
    //prep data for worker
   
    
  }

}

export default TCAS;