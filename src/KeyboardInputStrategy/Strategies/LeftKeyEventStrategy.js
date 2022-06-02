import { SKIERDIRECTION } from "../../Constants";
import { GAMESETTINGS } from "../../Settings";
export class LeftKeyEventStrategy {

    /**
     * Turn the skier left. If they're already completely facing left, move them left. Otherwise, change their direction
     * one step left. If they're in the crashed state, then first recover them from the crash.
     */
         executeStrategy(skier) {
            if (GAMESETTINGS.CANPLAY) {
                if(skier.isCrashed()) {
                    skier.recoverFromCrash(SKIERDIRECTION.DIRECTION_LEFT);
                }
        
                if(skier.direction === SKIERDIRECTION.DIRECTION_LEFT) {
                    skier.moveSkierLeft();
                }
                else {
                    skier.setDirection(skier.direction - 1);
                }
            }
            return true;
        }
}