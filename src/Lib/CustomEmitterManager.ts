import { EventEmitter } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";

export interface CustomActorEventBus extends ActorEvents {
  leftStickIdle: {};
  leftStickLeft: {};
  leftStickRight: {};
  leftStickDown: {};
  leftStickDownLeft: {};
  leftStickDownRight: {};
  leftStickUpLeft: {};
  leftStickUpRight: {};
  leftStickUp: {};
  rightStickIdle: {};
  rightStickLeft: {};
  rightStickRight: {};
  rightStickDown: {};
  rightStickDownLeft: {};
  rightStickDownRight: {};
  rightStickUpLeft: {};
  rightStickUpRight: {};
  rightStickUp: {};
  shoot: {};
  stopshoot: {};
  toggleArm: {};
  outOfAmmo: {};
}

export const ActorSignals = new EventEmitter<CustomActorEventBus>();
