import { SKIERDIRECTION } from "../../Constants";
import { GAMESETTINGS } from "../../Settings";
export class RightKeyEventStrategy {

    /**
     * Turn the skier right. If they're already completely facing right, move them right. Otherwise, change their direction
     * one step right. If they're in the crashed state, then first recover them from the crash.
     */
         executeStrategy(skier) {
            if (GAMESETTINGS.CANPLAY) {
                if(skier.isCrashed()) {
                    skier.recoverFromCrash(SKIERDIRECTION.DIRECTION_RIGHT);
                }
        
                if(skier.direction === SKIERDIRECTION.DIRECTION_RIGHT) {
                    skier.moveSkierRight();
                }
                else {
                    skier.setDirection(skier.direction + 1);
                }
            }
            return true;
        }
}