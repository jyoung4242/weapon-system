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

      if (engine.input.keyboard.isHeld(Keys.Left) && engine.input.keyboard.isHeld(Keys.Down)) {
        ActorSignals.emit("leftStickDownLeft");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Right) && engine.input.keyboard.isHeld(Keys.Up)) {
        ActorSignals.emit("leftStickUpRight");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Right) && engine.input.keyboard.isHeld(Keys.Down)) {
        ActorSignals.emit("leftStickDownRight");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Left) && engine.input.keyboard.isHeld(Keys.Up)) {
        ActorSignals.emit("leftStickUpLeft");
        return;
      } else if (engine.input.keyboard.isHeld(Keys.Left)) {
        ActorSignals.emit("leftStickLeft");
      } else if (engine.input.keyboard.isHeld(Keys.Right)) {
        ActorSignals.emit("leftStickRight");
      } else if (engine.input.keyboard.isHeld(Keys.Up)) {
        ActorSignals.emit("leftStickUp");
      } else if (engine.input.keyboard.isHeld(Keys.Down)) {
        ActorSignals.emit("leftStickDown");
      }

      if (
        !engine.input.keyboard.isHeld(Keys.Left) &&
        !engine.input.keyboard.isHeld(Keys.Right) &&
        !engine.input.keyboard.isHeld(Keys.Up) &&
        !engine.input.keyboard.isHeld(Keys.Down)
      ) {
        ActorSignals.emit("leftStickIdle");
      }
    }
  }
}
