import { GAMESETTINGS } from "../../Settings";
export class StartPauseKeyEventStrategy {

    /**
     * Start/Pause Game
     */
    executeStrategy(skier) {
        GAMESETTINGS.CANPLAY = GAMESETTINGS.CANPLAY ? false : true;
        return true;
    }
}