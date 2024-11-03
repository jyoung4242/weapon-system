import {
  ActionCompleteEvent,
  Actor,
  Collider,
  CollisionContact,
  CollisionGroupManager,
  CollisionType,
  Engine,
  Random,
  Side,
  toRadians,
  Vector,
} from "excalibur";
import { bugSS } from "../resources";
import { bugAnimation } from "../Animations/bugAnimations";
import { enemyColliders } from "../main";

export class Bug extends Actor {
  constructor(pos: Vector) {
    super({
      name: "bug",
      pos,
      width: 16,
      height: 16,
      //radius: 16,
      collisionGroup: enemyColliders,
      z: 4,
    });
    this.graphics.use(bugAnimation);
  }

  onInitialize(engine: Engine): void {
    this.vel = new Vector(0, -50);
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {}

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.pos.y < 200) {
      this.vel = new Vector(0, 50);
      this.actions.rotateBy(toRadians(180), 10);
    } else if (this.pos.y > 400) {
      this.actions.rotateBy(toRadians(-180), 10);
      this.vel = new Vector(0, -50);
    }
  }
}
