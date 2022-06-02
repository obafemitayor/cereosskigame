import { Collision } from "./Collision";
export class RampCollision extends Collision {
    /**
     * Draw the entity to the canvas centered on the X,Y position.
     */
     checkBehaviour(skier, obstacle) {
         if (obstacle.imageName  === "jumpRamp") {
            skier.shouldCrash = false;
            skier.jump();
         }
         else{
            if (this.next != null) {
                this.next.checkBehaviour(skier, obstacle);
             }
         }
    }
}