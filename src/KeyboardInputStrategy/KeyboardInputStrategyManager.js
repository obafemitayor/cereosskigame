import { LeftKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/LeftKeyEventStrategy";
import { RightKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/RightKeyEventStrategy";
import { UpKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/UpKeyEventStrategy";
import { DownKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/DownKeyEventStrategy";
import { JumpKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/JumpKeyEventStrategy";
import { StartPauseKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/StartPauseKeyEventStrategy";
import { RestartGameKeyEventStrategy } from "../KeyboardInputStrategy/Strategies/RestartGameKeyEventStrategy";
export const KEYEVENTSTRATEGYMANAGER = {
    "ArrowLeft" : new LeftKeyEventStrategy(),
    "ArrowRight" : new RightKeyEventStrategy(),
    "ArrowUp" : new UpKeyEventStrategy(),
    "ArrowDown" : new DownKeyEventStrategy(),
    "32" : new JumpKeyEventStrategy(),
    "115" : new StartPauseKeyEventStrategy(),
    "114" : new RestartGameKeyEventStrategy()
};