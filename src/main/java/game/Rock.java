package game;


import javafx.geometry.Bounds;
import javafx.scene.image.ImageView;

/**
 * A sprite of a rock(asteroid).
 */
public class Rock extends ImageView {

    protected static int rockSize = 60;
    private Game game;
    private double dx;
    private double dy;
    private int rotation = 0;
    private int rotateBy;

    /**
     * Constructs a big rock object.
     * @param game parent game
     * @param xPos the X position of the rock
     * @param yPos the Y position of the rock
     * @param dx change in x per update
     * @param dy change in y per update
     */
    public Rock(Game game, double xPos, double yPos, double dx, double dy) {
        super("file:src/main/resources/sprites/Asteroid.png");
        this.setPreserveRatio(true);
        this.setFitWidth(rockSize);
        this.setFitHeight(rockSize);
        this.game = game;
        this.setX(xPos);
        this.setY(yPos);
        this.dx = dx;
        this.dy = dy;
        this.rotateBy = 2;
    } // Rock

    /**
     * Constructs a small rock object.
     * @param game parent game
     * @param dx change in x per update
     * @param dy change in y per update
     */
    public Rock(Game game, double dx, double dy) {
        super("file:src/main/resources/sprites/Asteroid.png");
        this.setPreserveRatio(true);
        this.setFitWidth(rockSize / 2);
        this.setFitHeight(rockSize / 2);
        this.game = game;
        this.dx = dx;
        this.dy = dy;
        this.rotateBy = 4;
    } // Rock

    /**
     * Update position of the rock.
     */
    public void update() {
        // Teleports rock onto other bound
        Bounds gameBounds = game.getGameBounds();
        if (this.getX() < gameBounds.getMinX()) {
            this.setX(gameBounds.getMaxX() - 5);
        }
        if (this.getX() > gameBounds.getMaxX()) {
            this.setX(gameBounds.getMinX() + 5);
        }
        if (this.getY() < gameBounds.getMinY()) {
            this.setY(gameBounds.getMaxY() - 5);
        }
        if (this.getY() > gameBounds.getMaxY()) {
            this.setY(gameBounds.getMinY() + 5);
        }
        move();
    } // update

    /**
     * Moves the rock.
     */
    private void move() {
        this.setX(getX() + dx);
        this.setY(getY() + dy);
        this.setRotate(rotation);
        rotation += rotateBy;
    } // move

} // Rock
