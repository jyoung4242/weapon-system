import {
  Actor,
  Collider,
  CollisionContact,
  CollisionGroup,
  CollisionType,
  Color,
  Engine,
  Resource,
  Side,
  toDegrees,
  toRadians,
  Vector,
} from "excalibur";
import { WeaponConfig, WeaponType } from "../Weapon";
import { Resources } from "../../resources";
import { bulletColliders } from "../../main";
import { Bug } from "../../Actors/bug";
import { Wall } from "../../Lib/roomBuilder";

class SpreaderSparks extends Actor {
  constructor(public speed: number, public point: Vector, public direction: Vector, public type: "center" | "left" | "right") {
    super({
      width: 5,
      height: 5,
      collisionType: CollisionType.Passive,
      collisionGroup: bulletColliders,
      z: 10,
      scale: new Vector(2, 2),
    });
    this.pos = this.point.clone();

    let angle: number = 0;
    if (type == "center") {
      angle = direction.toAngle();
      this.vel = direction.scale(this.speed);
    } else if (type == "left") {
      angle = direction.toAngle() - 0.175;

      this.vel = this.direction.rotate(toRadians(-10)).scale(this.speed);
    } else {
      angle = direction.toAngle() + 0.175;
      this.vel = this.direction.rotate(toRadians(10)).scale(this.speed);
    }

    this.rotation = angle;
    this.graphics.add(Resources.spreaderBolt.toSprite());
  }

  onInitialize(engine: Engine): void {}

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner instanceof Bug) {
      other.owner.showDamage(this.direction);
      this.kill();
    } else if (other.owner instanceof Wall) {
      this.kill();
    }
  }
}

export class Spreader implements WeaponConfig {
  flashColor: Color = Color.fromHex("#CC3300");
  maxAmmo: number = 25;
  name: WeaponType = WeaponType.spreader;
  damage: number = 2;
  cycleRate: number = 15;

  spawn: (engine: Engine, point: Vector, direction: Vector) => void = (engine: Engine, point: Vector, direction: Vector) => {
    engine.currentScene.add(new SpreaderSparks(350, point, direction, "center"));
    engine.currentScene.add(new SpreaderSparks(350, point, direction, "left"));
    engine.currentScene.add(new SpreaderSparks(350, point, direction, "right"));
  };
}
