/**
 * The skier is the entity controlled by the player in the game. The skier skis down the hill, can move at different
 * angles, and crashes into obstacles they run into. If caught by the rhino, the skier will get eaten and die.
 */

import { IMAGE_NAMES, ANIMATION_FRAME_SPEED_MS, DIAGONAL_SPEED_REDUCER, KEYS, JUMPING_TIME, CANTJUMPOBSTACLES, SKIERDIRECTION } from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { SkiTimer } from "../Core/timer";
import { ObstacleCollisionBehaviourManager } from "../Entities/Obstacles/ObstacleCollisionBehaviourManager";

/**
 * The skier starts running at this speed. Saved in case speed needs to be reset at any point.
 * @type {number}
 */
const STARTING_SPEED = 5;

/**
 * The different states the skier can be in.
 * @type {string}
 */
const STATE_SKIING = "skiing";
const STATE_CRASHED = "crashed";
const STATE_DEAD = "dead";

/**
 * Mapping of the image to display for the skier based upon which direction they're facing.
 * @type {{number: string}}
 */
const DIRECTION_IMAGES = {
    [SKIERDIRECTION.DIRECTION_LEFT] : IMAGE_NAMES.SKIER_LEFT,
    [SKIERDIRECTION.DIRECTION_LEFT_DOWN] : IMAGE_NAMES.SKIER_LEFTDOWN,
    [SKIERDIRECTION.DIRECTION_DOWN] : IMAGE_NAMES.SKIER_DOWN,
    [SKIERDIRECTION.DIRECTION_RIGHT_DOWN] : IMAGE_NAMES.SKIER_RIGHTDOWN,
    [SKIERDIRECTION.DIRECTION_RIGHT] : IMAGE_NAMES.SKIER_RIGHT
};

const IMAGES_JUMPING = [
    IMAGE_NAMES.SKIER_JUMP1,
    IMAGE_NAMES.SKIER_JUMP2,
    IMAGE_NAMES.SKIER_JUMP3,
    IMAGE_NAMES.SKIER_JUMP4,
    IMAGE_NAMES.SKIER_JUMP5
];
const JUMP = "jump";
const ANIMATIONS = {
    [JUMP] : IMAGES_JUMPING
};

export class Skier extends Entity {
    /**
     * The name of the current image being displayed for the skier.
     * @type {string}
     */
    imageName = IMAGE_NAMES.SKIER_DOWN;

    /**
     * What state the skier is currently in.
     * @type {string}
     */
    state = STATE_SKIING;

    /**
     * If the skier is in a jump state.
     * @type {boolean}
     */
     jumpState = false;

     /**
     * If the skier should crash.
     * @type {boolean}
     */
    shouldCrash = false;

     /**
     * If Animation Should Occur.
     * @type {boolean}
     */
    shouldAnimate = false;
     /**
     * The Current Animation.
     * @type {boolean}
     */
    currentAnimation = null;
    
     /**
     * If animation can move to the next frame.
     * @type {boolean}
     */
    canMoveToNextFrame = true;

    /**
     * What direction the skier is currently facing.
     * @type {number}
     */
    direction = SKIERDIRECTION.DIRECTION_DOWN;

    /**
     * How fast the skier is currently moving in the game world.
     * @type {number}
     */
    speed = STARTING_SPEED;

    /**
     * Stored reference to the ObstacleManager
     * @type {ObstacleManager}
     */
    obstacleManager = null;

    /**
     * The current frame of the current animation the rhino is on.
     * @type {number}
     */
    curAnimationFrame = 0;
    /**
     * Stored reference to a Collision Behaviour
     */
    obstacleCollisionBehaviour = null;

    /**
     * Init the skier.
     *
     * @param {number} x
     * @param {number} y
     * @param {ImageManager} imageManager
     * @param {ObstacleManager} obstacleManager
     * @param {Canvas} canvas
     */
    constructor(x, y, imageManager, obstacleManager, canvas) {
        super(x, y, imageManager, canvas);

        this.obstacleManager = obstacleManager;
        this.jumpingTimeout = {};
        this.skiTimer = new SkiTimer();
        this.obstacleCollisionBehaviour = new ObstacleCollisionBehaviourManager().registerCollisionBehaviours();
    }

    /**
     * Is the skier currently in the crashed state
     *
     * @returns {boolean}
     */
    isCrashed() {
        return this.state === STATE_CRASHED;
    }

    /**
     * Is the skier currently in the skiing state
     *
     * @returns {boolean}
     */
    isSkiing() {
        return this.state === STATE_SKIING;
    }

    /**
     * Is the skier currently in the dead state
     *
     * @returns {boolean}
     */
    isDead() {
        return this.state === STATE_DEAD;
    }
    
    /**
     * Set the current direction the skier is facing and update the image accordingly
     *
     * @param {number} direction
     */
    setDirection(direction) {
        this.direction = direction;
        this.setDirectionalImage();
    }

    /**
     * Set the skier's image based upon the direction they're facing.
     */
    setDirectionalImage() {
        this.imageName = DIRECTION_IMAGES[this.direction];
    }

    /**
     * Move the skier and check to see if they've hit an obstacle. The skier only moves in the skiing state.
     */
    update() {
        if(this.isSkiing()) {
            this.animate();
            this.move();
            this.checkIfHitObstacle();
        }
    }

    /**
     * Draw the skier if they aren't dead
     */
    draw() {
        if(this.isDead()) {
            return;
        }

        super.draw();
    }

    /**
     * Move the skier based upon the direction they're currently facing. This handles frame update movement.
     */
    move() {
        switch(this.direction) {
            case SKIERDIRECTION.DIRECTION_LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case SKIERDIRECTION.DIRECTION_DOWN:
                this.moveSkierDown();
                break;
            case SKIERDIRECTION.DIRECTION_RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
            case SKIERDIRECTION.DIRECTION_LEFT:
            case SKIERDIRECTION.DIRECTION_RIGHT:
                // Specifically calling out that we don't move the skier each frame if they're facing completely horizontal.
                break;
        }
    }

    /**
     * Move the skier left. Since completely horizontal movement isn't frame based, just move incrementally based upon
     * the starting speed.
     */
    moveSkierLeft() {
        this.x -= STARTING_SPEED;
    }

    /**
     * Move the skier diagonally left in equal amounts down and to the left. Use the current speed, reduced by the scale
     * of a right triangle hypotenuse to ensure consistent traveling speed at an angle.
     */
    moveSkierLeftDown() {
        this.x -= this.speed / DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Move the skier down at the speed they're traveling.
     */
    moveSkierDown() {
        this.y += this.speed;
    }

    /**
     * Move the skier diagonally right in equal amounts down and to the right. Use the current speed, reduced by the scale
     * of a right triangle hypotenuse to ensure consistent traveling speed at an angle.
     */
    moveSkierRightDown() {
        this.x += this.speed / DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Move the skier right. Since completely horizontal movement isn't frame based, just move incrementally based upon
     * the starting speed.
     */
    moveSkierRight() {
        this.x += STARTING_SPEED;
    }

    /**
     * Move the skier up. Since moving up isn't frame based, just move incrementally based upon
     * the starting speed.
     */
    moveSkierUp() {
        this.y -= STARTING_SPEED;
    }

    /**
     * Make the skier jump. Jump occurs in the current direction of the skier.
     */
     jump() {
        if(this.isCrashed()) {
            return;
        }
        if (this.direction === SKIERDIRECTION.DIRECTION_DOWN ||
            this.direction === SKIERDIRECTION.DIRECTION_LEFT_DOWN ||
            this.direction === SKIERDIRECTION.DIRECTION_RIGHT_DOWN
        )
        {
            this.setJumping(true);
        }
    }

    /**
     * Set The JumpState and Animation Fields To True or False Depending on The state of the Jump
     */
    setJumping(value) {
        this.jumpState = value;
        this.shouldAnimate = value;
        this.currentAnimation = JUMP;
        this.curAnimationFrame = 0;
    }

    /**
     * Do Animation for current Animation State 
     */
    animate() {
        const animationImages = ANIMATIONS[this.currentAnimation];
        if(this.shouldAnimate) {
            if (this.canMoveToNextFrame) {
                if (this.curAnimationFrame < animationImages.length) {
                    this.canMoveToNextFrame = false;
                    this.imageName = animationImages[this.curAnimationFrame];
                    this.skiTimer.createTimeout(() => { this.canMoveToNextFrame = true }, JUMPING_TIME);
                    this.curAnimationFrame++;
                }
                else{
                    this.setJumping(false);
                    this.canMoveToNextFrame = true;
                    this.setDirectionalImage();
                }
            }
        }
    }

    /**
     * The skier has a bit different bounds calculating than a normal entity to make the collision with obstacles more
     * natural. We want te skier to end up in the obstacle rather than right above it when crashed, so move the bottom
     * boundary up.
     *
     * @returns {Rect}
     */
    getBounds() {
        const image = this.imageManager.getImage(this.imageName);
        return new Rect(
            this.x - image.width / 2,
            this.y - image.height / 2,
            this.x + image.width / 2,
            this.y - image.height / 4
        );
    }

    /**
     * Go through all the obstacles in the game and see if the skier collides with any of them. If so, crash the skier.
     */
    checkIfHitObstacle() {
        const skierBounds = this.getBounds();

        const collision = this.obstacleManager.getObstacles().find((obstacle) => {
            const obstacleBounds = obstacle.getBounds();
            return intersectTwoRects(skierBounds, obstacleBounds) ? obstacle : false;
        });
        if(collision) {
            // Use chain of responsibility design pattern to handle what should happen when a skier collides with an obstacle.
            this.shouldCrash = true;
            this.obstacleCollisionBehaviour.checkBehaviour(this, collision);
            if (this.shouldCrash) {
                this.crash();
            }
        }
    }

    /**
     * Crash the skier. Set the state to crashed, set the speed to zero cause you can't move when crashed and update the
     * image.
     */
    crash() {
        this.state = STATE_CRASHED;
        this.speed = 0;
        this.imageName = IMAGE_NAMES.SKIER_CRASH;
    }

    /**
     * Change the skier back to the skiing state, get them moving again at the starting speed and set them facing
     * whichever direction they're recovering to.
     *
     * @param {number} newDirection
     */
    recoverFromCrash(newDirection) {
        this.state = STATE_SKIING;
        this.speed = STARTING_SPEED;
        this.setDirection(newDirection);
    }

    /**
     * Kill the skier by putting them into the "dead" state and stopping their movement.
     */
    die() {
        this.state = STATE_DEAD;
        this.speed = 0;
    }
}