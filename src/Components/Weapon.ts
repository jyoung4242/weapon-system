import { Actor, ActorEvents, Color, Component, Engine, Vector } from "excalibur";
import { ActorSignals } from "../Lib/CustomEmitterManager";
/*
WeaponSystem

Goals: 
-----------------------
- change weapons
- manage firing
- manage spawning of bullets
- manage ammo level
- manage tint (color) of weapon flash

*/

export class Primary implements WeaponConfig {
  flashColor: Color = Color.fromHex("#63DEFF");
  maxAmmo: number = Infinity;
  name: WeaponType = WeaponType.primary;
  damage: number = 1;
  cycleRate: number = 10;

  spawn: (engine: Engine, point: Vector, direction: Vector) => void = (engine: Engine, point: Vector, direction: Vector) => {};
}

export enum WeaponType {
  primary = "primary",
  spreader = "spreader",
}

export interface WeaponConfig {
  name: WeaponType;
  spawn: (engine: Engine, direction: Vector, point: Vector) => void;
  flashColor: Color;
  maxAmmo: number;
  cycleRate: number;
}

export class WeaponSystem extends Component {
  isFiring: boolean = false;
  currentWeapon: string = "primary";
  weapons: Record<string, WeaponConfig> = {};
  maxAmmo: number = Infinity;
  ammoCount: number = Infinity;
  cycleTik: number = 0;
  weaponCycleRate: number = 50;

  constructor(public owner: Actor) {
    super();
    this.loadWeapon(new Primary());
  }

  onAdd(): void {
    this.owner.on("preupdate", this.onPreUpdate.bind(this));
  }

  loadWeapon(config: WeaponConfig) {
    if (this.weapons[config.name]) {
      throw new Error(`weapon ${config.name} already exists`);
    }
    this.weapons[config.name] = config;
  }

  switchWeapon(nextweapon: WeaponType): Color {
    this.currentWeapon = nextweapon;
    this.cycleTik = 0;
    this.weaponCycleRate = this.weapons[nextweapon].cycleRate;
    this.ammoCount = this.weapons[nextweapon].maxAmmo;
    return this.weapons[nextweapon].flashColor;
  }

  setFiringStatus(isFiring: boolean): void {
    this.isFiring = isFiring;
  }

  spawnBullet(engine: Engine, point: Vector, direction: Vector) {
    if (this.ammoCount > 0) {
      this.ammoCount--;
      this.weapons[this.currentWeapon].spawn(engine, point, direction);

      if (this.ammoCount <= 0) {
        ActorSignals.emit("outOfAmmo");
      }
    }
  }

  onPreUpdate(event: ActorEvents["preupdate"]): void {
    //console.log(this.isFiring);

    if (this.isFiring) {
      this.cycleTik++;

      if (this.cycleTik > this.weaponCycleRate) {
        this.cycleTik = 0;
        //@ts-ignore
        this.spawnBullet(event.engine, this.owner.globalPos, this.owner.vecDir);
      }
    }
  }
}
