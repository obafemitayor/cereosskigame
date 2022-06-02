import { Collision } from "./Collision";
import { CANTJUMPOBSTACLES } from "../../../Constants";
export class CanJumpCollision extends Collision {
    /**
     * Draw the entity to the canvas centered on the X,Y position.
     */
     checkBehaviour(skier, obstacle) {
        if (skier.jumpState && !(obstacle.imageName in CANTJUMPOBSTACLES)) {
            skier.shouldCrash = false;
        }
        else{
            if (this.next != null) {
                this.next.checkBehaviour(skier, obstacle);
             }
        }
    }
}