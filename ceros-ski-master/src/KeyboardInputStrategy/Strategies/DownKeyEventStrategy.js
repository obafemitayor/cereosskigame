import { SKIERDIRECTION } from "../../Constants";
import { GAMESETTINGS } from "../../Settings";
export class DownKeyEventStrategy {

    /**
     * Turn the skier to face straight down. If they're crashed don't do anything to require them to move left or right
     * to escape an obstacle before skiing down again.
     */
         executeStrategy(skier) {
             if (GAMESETTINGS.CANPLAY) {
                if(skier.isCrashed()) {
                    return;
                }
                skier.setDirection(SKIERDIRECTION.DIRECTION_DOWN);
             }
            return true;
        }
}