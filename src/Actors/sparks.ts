import { Actor, Engine, Vector } from "excalibur";
import { sparksAnimation } from "../Animations/sparks";

export class Sparks extends Actor {
  constructor(pos: Vector) {
    super({
      name: "sparks",
      width: 16,
      height: 16,
      pos,
      anchor: Vector.Half,
      z: 10,
    });

    this.graphics.use(sparksAnimation);
  }

  onInitialize(engine: Engine): void {
    sparksAnimation.reset();

    sparksAnimation.events.once("end", () => {
      console.log("animation end");
      this.kill();
    });
  }

  onPreUpdate(engine: Engine, elapsedMs: number): void {
    this.graphics.use(sparksAnimation);
  }
}
