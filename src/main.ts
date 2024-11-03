// main.ts
import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, Vector, CollisionGroup } from "excalibur";
import { model, template } from "./UI/UI";
import { loader } from "./resources";
import { RoomBuilder } from "./Lib/roomBuilder";
import { Player } from "./Actors/Player";
import { GamepadControl } from "./Lib/Gamepad";
import { KeyboardControl } from "./Lib/Keyboard";
import { TouchpadController } from "./Lib/Touchpad";
import { Bug } from "./Actors/bug";
await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
});
//game.toggleDebug();

export const playerColliders = new CollisionGroup("playerCollider", 0b0001, ~0b1100);
export const bulletColliders = new CollisionGroup("bulletColliders", 0b0010, ~0b1100);
export const wallColliders = new CollisionGroup("wallColliders", 0b0101, ~0b1011);
export const enemyColliders = new CollisionGroup("enemyColliders", 0b1000, ~0b0111);

let myGamePadController = new GamepadControl(game);
let myKeyboardController = new KeyboardControl(game);
let myTouchController = new TouchpadController(game);

const myRoomBuilder = new RoomBuilder(game, Date.now());

await game.start(loader);
const room = await myRoomBuilder.generateRoom();
game.add(room);
game.currentScene.camera.strategy.lockToActor(room);

export const player = new Player();
export const mybug = new Bug(new Vector(650, 250));
game.add(player);
game.add(mybug);

game.onPreUpdate = (engine: Engine, delta: number) => {
  myGamePadController.update(engine, delta);
  myKeyboardController.update(engine, delta);
  myTouchController.update(engine, delta);
};
