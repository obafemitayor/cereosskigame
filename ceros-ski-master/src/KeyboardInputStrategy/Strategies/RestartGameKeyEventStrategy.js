export class RestartGameKeyEventStrategy {
    /**
     * Reload Game
     */
    executeStrategy(skier) {
        window.location.reload(true);
        return true;
    }
}