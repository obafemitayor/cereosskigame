import { RampCollision } from "./ObstacleCollisionBehaviour/RampCollision";
import { CanJumpCollision } from "./ObstacleCollisionBehaviour/CanJumpCollision";
export class ObstacleCollisionBehaviourManager {
    /**
     * Draw the entity to the canvas centered on the X,Y position.
     */
     registerCollisionBehaviours() {
         let rampCollision = new RampCollision();
         let jumpCollision = new CanJumpCollision();
         rampCollision.next = jumpCollision;
         return rampCollision;
    }
}