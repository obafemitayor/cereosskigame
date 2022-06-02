import { SKIERDIRECTION } from "../../Constants";
import { GAMESETTINGS } from "../../Settings";
export class UpKeyEventStrategy {

    /**
     * Turn the skier up which basically means if they're facing left or right, then move them up a bit in the game world.
     * If they're in the crashed state, do nothing as you can't move up if you're crashed.
     */
         executeStrategy(skier) {
            if (GAMESETTINGS.CANPLAY) {
                if(skier.isCrashed()) {
                    return;
                }
        
                if(skier.direction === SKIERDIRECTION.DIRECTION_LEFT || skier.direction === SKIERDIRECTION.DIRECTION_RIGHT) {
                    skier.moveSkierUp();
                }
            }
            return true;
        }
}