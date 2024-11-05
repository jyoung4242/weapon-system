import { Buttons, Engine, Handler, Input, PointerButton, toDegrees, Vector } from "excalibur";
import { ActorSignals } from "./CustomEmitterManager";
import { player } from "../main";

export class MouseManager {
  mouseInputTik: number = 0;
  mouseInputLimit: number = 3;
  isInitialized: boolean = false;

  constructor(engine: Engine) {
    this.moveHandler = this.moveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    engine.input.pointers.primary.on("move", this.moveHandler);
    engine.input.pointers.primary.on("down", this.clickHandler);
    engine.input.pointers.primary.on("up", this.clickHandler);
  }

  initialize() {
    this.isInitialized = true;
  }

  moveHandler(e: Input.PointerEvent) {
    if (!this.isInitialized) return;

    this.mouseInputTik += 1;

    if (this.mouseInputTik >= this.mouseInputLimit) {
      this.mouseInputTik = 0;
      const mousePos = e.coordinates.worldPos;
      let playerPos: Vector = new Vector(0, 0);

      if (player) {
        playerPos = player.pos.add(new Vector(player.width / 2, player.height / 2));
      }

      //find angle between mouse location and player location
      const angle = toDegrees(Math.atan2(mousePos.y - playerPos.y, mousePos.x - playerPos.x));

      if (angle > -22.5 && angle <= 22.5) {
        ActorSignals.emit("rightStickRight");
      } else if (angle > 180 - 22.5 || angle <= -180 + 22.5) {
        ActorSignals.emit("rightStickLeft");
      } else if (angle > 90 - 22.5 && angle <= 90 + 22.5) {
        ActorSignals.emit("rightStickDown");
      } else if (angle < -90 + 22.5 && angle >= -90 - 22.5) {
        ActorSignals.emit("rightStickUp");
      } else if (angle < 45 + 22.5 && angle >= 45 - 22.5) {
        ActorSignals.emit("rightStickDownRight");
      } else if (angle < 135 + 22.5 && angle >= 135 - 22.5) {
        ActorSignals.emit("rightStickDownLeft");
      } else if (angle < -45 + 22.5 && angle >= -45 - 22.5) {
        ActorSignals.emit("rightStickUpRight");
      } else if (angle < -135 + 22.5 && angle >= -135 - 22.5) {
        ActorSignals.emit("rightStickUpLeft");
      }
    }
  }

  clickHandler(e: Input.PointerEvent) {
    if (!this.isInitialized) return;
    if (e.button === PointerButton.Left) {
      if (e.type === "down") {
        // start shooting
        ActorSignals.emit("shoot");
      } else if (e.type === "up") {
        // stop shooting

        ActorSignals.emit("stopshoot");
      }
    }
  }
}
