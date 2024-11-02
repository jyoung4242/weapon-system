import { Engine, Keys } from "excalibur";
import { ActorSignals } from "./CustomEmitterManager";

export class KeyboardControl {
  keyboardInputTiker = 0;
  constructor(engine: Engine) {}

  update(engine: Engine, delta: number) {
    this.keyboardInputTiker++;

    if (engine.input.keyboard.wasPressed(Keys.Enter)) {
      ActorSignals.emit("toggleArm");
    }

    if (this.keyboardInputTiker >= 3) {
      this.keyboardInputTiker = 0;

      if (engine.input.keyboard.isHeld(Keys.Space)) {
        ActorSignals.emit("shoot");
      } else {
        ActorSignals.emit("stopshoot");
      }

      if (engine.input.keyboard.isHeld(Keys.Left) && engine.input.keyboard.isHeld(Keys.Down)) {
        ActorSignals.emit("walkDownLeft");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Right) && engine.input.keyboard.isHeld(Keys.Up)) {
        ActorSignals.emit("walkUpRight");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Right) && engine.input.keyboard.isHeld(Keys.Down)) {
        ActorSignals.emit("walkDownRight");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Left) && engine.input.keyboard.isHeld(Keys.Up)) {
        ActorSignals.emit("walkUpLeft");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Left)) {
        ActorSignals.emit("walkLeft");
      } else if (engine.input.keyboard.isHeld(Keys.Right)) {
        ActorSignals.emit("walkRight");
      } else if (engine.input.keyboard.isHeld(Keys.Up)) {
        ActorSignals.emit("walkUp");
      } else if (engine.input.keyboard.isHeld(Keys.Down)) {
        ActorSignals.emit("walkDown");
      }

      if (
        !engine.input.keyboard.isHeld(Keys.Left) &&
        !engine.input.keyboard.isHeld(Keys.Right) &&
        !engine.input.keyboard.isHeld(Keys.Up) &&
        !engine.input.keyboard.isHeld(Keys.Down)
      ) {
        ActorSignals.emit("idle");
      }
    }
  }
}
