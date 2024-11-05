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
  Flash,
  Color,
  ParallelActions,
  Blink,
  EaseTo,
  EasingFunctions,
} from "excalibur";
import { bugSS } from "../resources";
import { bugAnimation } from "../Animations/bugAnimations";
import { enemyColliders } from "../main";
//import { Flash } from "../Lib/flash";

export class Bug extends Actor {
  isTempInvulnerable = false;
  tempInvulnerableTimer = 0;
  tempInvulnerableDuration = 100;
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

  showDamage(direction: Vector) {
    if (!this.isTempInvulnerable) {
      this.isTempInvulnerable = true;
      const PAs = new ParallelActions([
        new Flash(this, Color.Red, 500),
        new Blink(this, 50, 50, 10),
        new EaseTo(this, this.pos.add(direction.scale(10)).x, this.pos.add(direction.scale(10)).y, 25, EasingFunctions.EaseInOutQuad),
      ]);
      //use direction vector to do a knockback
      this.actions.runAction(PAs);
    }
  }

  onPreUpdate(engine: Engine, delta: number): void {
    if (!this.isTempInvulnerable) {
      if (this.pos.y < 200) {
        this.vel = new Vector(0, 50);
        this.actions.rotateBy(toRadians(180), 10);
      } else if (this.pos.y > 400) {
        this.actions.rotateBy(toRadians(-180), 10);
        this.vel = new Vector(0, -50);
      }
    } else {
      this.tempInvulnerableTimer++;
      if (this.tempInvulnerableTimer > this.tempInvulnerableDuration) {
        this.tempInvulnerableTimer = 0;
        this.actions.moveTo(new Vector(650, this.pos.y), 50);
        this.actions.rotateTo(toRadians(-180), 10);
        setTimeout(() => {
          this.vel = new Vector(0, 50);
          this.isTempInvulnerable = false;
        }, 500);
      }
    }
  }
}
