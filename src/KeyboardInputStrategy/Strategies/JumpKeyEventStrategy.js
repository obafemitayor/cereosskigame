import { GAMESETTINGS } from "../../Settings";
export class JumpKeyEventStrategy {
    executeStrategy(skier) {
        if (GAMESETTINGS.CANPLAY) {
            skier.jump();
        }
        return true;
    }
}