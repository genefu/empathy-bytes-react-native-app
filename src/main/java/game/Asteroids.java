package game;


import java.util.logging.Level;
import java.util.Random;
import java.lang.Math;

import javafx.scene.input.KeyCode;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.scene.layout.Region;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.image.ImageView;
import javafx.scene.shape.Circle;
import javafx.scene.control.Button;
import javafx.geometry.Insets;
import javafx.geometry.Bounds;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.control.Label;
import javafx.scene.text.Font;

/**
 * Creates an implementation of the Arcade Game Asteroids. The player can move
 * around in space and shoot at asteroids, destroying them, to get points.
 */
public class Asteroids extends Game {

    // Creating black background
    private final BackgroundFill blackFill = new BackgroundFill(new Color(0, 0, 0, 1),
            CornerRadii.EMPTY, Insets.EMPTY);
    private Background background = new Background(blackFill);

    // Instance variables for Rock
    private final int rockAmount = 5;
    private Random rng;
    protected double rockPosX = 0;
    protected double rockPosY = 0;
    protected double rockdx = 0;
    protected double rockdy = 0;
    private boolean negdx = false;
    private boolean negdy = false;
    private boolean yesToX = false;
    private boolean is0 = false;
    private Rock[] rocks = new Rock[rockAmount];
    private Rock[] rockSplits = new Rock[rockAmount * 2];
    private boolean[] rockSplitActive = new boolean[rockAmount * 2];
    private int rocksLeft = rockAmount + (rockAmount * 2);

    // Bounds
    private Bounds gameBounds = this.getGameBounds();

    // Player and current player's rotation
    private ImageView player;
    private double rotation = 0.0;

    // Instance Variables for projectiles and firing
    private int projectileLoad = 40;
    private Circle[] projectiles = new Circle[projectileLoad];
    private double[] rotationRads = new double[projectileLoad];
    private boolean alreadyPressed = false;
    private boolean projectileOverload = false;

    // Level: Increases rocks' speed as it increases
    private double level;

    // ScoreBoard
    private final Font font = new Font(22.28);
    private int points = 0;
    private ImageView scoreText;
    private Label scoreDisplay;
    private String pointsString = "0";
    private ImageView highScoreText;
    private Label highScoreDisplay;
    private int highScore = 0;
    private String highScoreString = "0";

    // Game Over
    private ImageView gameOverImage;
    private Button newGame;
    private ImageView newGameText;

    // Start Screen
    private ImageView startTitle;
    private ImageView playGraphic;
    private Button playButton;
    private boolean playPressed = false;
    private ImageView spaceship;

    // Controls
    private Label controls;

    /**
     * Constructs a {@code Asteroids} object.
     * @param width scene width
     * @param height scene height
     */
    public Asteroids(int width, int height) {

        super(width, height, 60);
        setLogLevel(Level.INFO);
        this.setBackground(background);
        this.level = 0.8;
        this.rng = new Random();

        // Start Screen
        makeStartScreen();

        // Game Over Screen
        makeGameOverScreen();

        // ScoreBoard
        makeScoreBoard();

        // Controls
        this.controls = new Label("Arrow Keys to move. Space to shoot.");
        controls.setFont(font);
        controls.setTextFill(Color.WHITE);
        controls.setLayoutX(150);
        controls.setLayoutY(420);
    } // Asteroids

    /** {@inheritDoc} */
    @Override
    protected void init() {

        // Play Button is not pressed
        if (!playPressed) {
            this.getChildren().addAll(startTitle, playButton, spaceship, controls);
            spaceship.setX(10);
            spaceship.setY(235);
            spaceship.setRotate(90);
        }
        // Play Button is pressed
        if (playPressed) {

            // Adding Player and Player's pos & rotation
            this.player = new ImageView("file:src/main/resources/sprites/player.png");
            this.player.setPreserveRatio(true);
            this.player.setFitWidth(20);
            this.player.setFitHeight(20);
            this.getChildren().addAll(player);
            player.setX(295);
            player.setY(215);
            player.setRotate(0);

            // Adding/Resetting ScoreBoard
            this.getChildren().addAll(scoreText, scoreDisplay);
            points = 0;
            pointsString = "0";
            scoreText.setX(0);
            scoreText.setY(0);
            scoreDisplay.setLayoutY(0);
            scoreDisplay.setLayoutX(102);

            // Creating rocks with random values
            createRocks();
            createRockSplits();
        }
    } // init

    /** {@inheritDoc} */
    @Override
    protected void update() {

        // Play Button is not pressed
        if (!playPressed) {
            spaceship.setX(spaceship.getX() + 4);
            playerInBounds(spaceship);
        }
        //Play Button is pressed
        if (playPressed) {

            // Player Controls
            rotateLeft();
            rotateRight();
            move();
            checkProjectileOverload();
            if (!projectileOverload) {
                isKeyPressed(KeyCode.SPACE, () -> makeProjectile());
            }

            // Checks to make sure player is not holding down Space
            if (isKeyPressed(KeyCode.SPACE) == false) {
                alreadyPressed = false;
            }

            // Player Bounds
            playerInBounds(player);

            // Player is hit
            if (player != null) {
                playerIsHit();
            }

            // Shoots and updates projectiles' placement
            updateProjectiles();

            // Updates rocks' positions and create rocks
            updateRocks();

            // Game Over
            if (player == null) {
                gameOver();
            }

            // Updates Score
            scoreUpdater(this.points, this.pointsString, this.scoreDisplay);
        }
    } // update

    /**
     * Makes projectiles when player is not null.
     */
    private void makeProjectile() {
        if (player != null) {
            double rotationRad = (rotation * Math.PI) / 180;
            int num = 0;
            boolean stop = false;
            for (int i = 0; i < projectiles.length && stop == false; i++) {
                if (projectiles[i] == null) {
                    num = i;
                    stop = true;
                }
            }
            if (alreadyPressed == false) {
                alreadyPressed = true;
                projectiles[num] = new Circle(player.getX() + 9.5 +
                        (15 * Math.sin(rotationRad)), player.getY() + 9.5 -
                        (15 * Math.cos(rotationRad)), 2.0, Color.WHITE);
                rotationRads[num] = rotationRad;
                this.getChildren().add(projectiles[num]);

            }
        }
    } // makeProjectile

    /**
     * Moves the projectiles if they are inside game bounds.
     * Removes the projectiles if it hits game bounds.
     * Removes rocks that has been hit with projectiles.
     * @param projectile the Circle object passed into to be shot.
     * @param rotationRad the rotation of the projectile when made in Radians
     */
    private void shoot(Circle projectile, double rotationRad) {
        double dx = 8 * Math.sin(rotationRad);
        double dy = 8 * Math.cos(rotationRad);
        if (projectile != null && projectile.getCenterX() > gameBounds.getMinX() + 5 &&
                projectile.getCenterX() < gameBounds.getMaxX() - 5 &&
                projectile.getCenterY() > gameBounds.getMinY() + 5 &&
                projectile.getCenterY() < gameBounds.getMaxY() - 5) {
            projectile.setCenterX(projectile.getCenterX() + dx);
            projectile.setCenterY(projectile.getCenterY() - dy);
            for (int i = 0; i < rocks.length; i++) {
                if (projectile != null && rocks[i] != null &&
                        projectile.getCenterX() > rocks[i].getX() &&
                        projectile.getCenterX() < (rocks[i].getX() + Rock.rockSize) &&
                        projectile.getCenterY() > rocks[i].getY() &&
                        projectile.getCenterY() < (rocks[i].getY() + Rock.rockSize)) {
                    this.getChildren().remove(projectile);
                    projectile = null;
                    addRockSplits(i);
                    this.getChildren().remove(rocks[i]);
                    rocks[i] = null;
                    rocksLeft--;
                    points += 250;

                }
            }
            for (int i = 0; i < rockSplits.length; i++) {
                if (projectile != null && rockSplits[i] != null &&
                        projectile.getCenterX() > rockSplits[i].getX() &&
                        projectile.getCenterX() < (rockSplits[i].getX() + (Rock.rockSize / 2)) &&
                        projectile.getCenterY() > rockSplits[i].getY() &&
                        projectile.getCenterY() < (rockSplits[i].getY() + (Rock.rockSize / 2))) {
                    this.getChildren().remove(projectile);
                    projectile = null;
                    this.getChildren().remove(rockSplits[i]);
                    rockSplits[i] = null;
                    rockSplitActive[i] = false;
                    rocksLeft--;
                    points += 100;
                }

            }
        } else {
            if (projectile != null) {
                this.getChildren().remove(projectile);
                projectile = null;
            }
        }
    } // shoot

    /**
     * Teleports a ship to the other bound when it hits a bound.
     * @param ship stays inside bounds
     */
    private void playerInBounds(ImageView ship) {
        if (ship != null) {
            if (ship.getX() < gameBounds.getMinX()) {
                ship.setX(gameBounds.getMaxX() - 5);
            }
            if (ship.getX() > gameBounds.getMaxX()) {
                ship.setX(gameBounds.getMinX() + 5);
            }
            if (ship.getY() < gameBounds.getMinY()) {
                ship.setY(gameBounds.getMaxY() - 5);
            }
            if (ship.getY() > gameBounds.getMaxY()) {
                ship.setY(gameBounds.getMinY() + 5);
            }
        }
    } // playerInBounds

    /**
     * Removes player and makes player null when hit with a
     * projectile.
     */
    private void playerIsHit() {
        for (int i = 0; i < rocks.length; i++) {
            if (rocks[i] != null && player != null) {
                if (player.getX() + 10 > rocks[i].getX() &&
                        player.getX() + 10 < (rocks[i].getX() + Rock.rockSize) &&
                        player.getY() + 10 > rocks[i].getY() &&
                        player.getY() + 10 < (rocks[i].getY() + Rock.rockSize)) {
                    this.getChildren().remove(player);
                    player = null;
                }
            }
        }
        for (int i = 0; i < rockSplits.length; i++) {
            if (rockSplits[i] != null && rockSplitActive[i] && player != null) {
                if (player.getX() + 10 > rockSplits[i].getX() &&
                        player.getX() + 10 < (rockSplits[i].getX() + (Rock.rockSize / 2)) &&
                        player.getY() + 10 > rockSplits[i].getY() &&
                        player.getY() + 10 < (rockSplits[i].getY() + (Rock.rockSize / 2))) {
                    this.getChildren().remove(player);
                    player = null;
                }
            }
        }

    } // playerIsHit

    /**
     * Creates rocks with random positions and speeds.
     */
    private void createRocks() {
        double levelAdjustedX = level;
        double levelAdjustedY = level;
        for (int i = 0; i < rocks.length; i++) {
            rockPosX = rng.nextDouble() * 630;
            rockPosY = rng.nextDouble() * 470;
            rockdx = rng.nextDouble();
            rockdy = rng.nextDouble();
            negdx = rng.nextBoolean();
            negdy = rng.nextBoolean();
            yesToX = rng.nextBoolean();
            is0 = rng.nextBoolean();
            if (yesToX) {
                rockPosY = 5;
            } else {
                rockPosX = 5;
            }
            if (negdx) {
                rockdx *= -1;
                levelAdjustedX *= -1;
            }
            if (negdy) {
                rockdy *= -1;
                levelAdjustedY *= -1;
            }
            if (rockdx == 0 && rockdy == 0) {
                if (is0) {
                    rockdx += levelAdjustedX;
                } else {
                    rockdy += levelAdjustedY;
                }
            } else if (rockdx == 0 && rockdy != 0) {
                rockdy += levelAdjustedY;
            } else if (rockdy == 0 && rockdx != 0) {
                rockdx += levelAdjustedX;
            } else {
                rockdx += levelAdjustedX;
                rockdy += levelAdjustedY;
            }
            rocks[i] = new Rock(this, rockPosX, rockPosY, rockdx, rockdy);
            this.getChildren().add(rocks[i]);
        }
        rocksLeft = rockAmount + (rockAmount * 2);
    } // createRocks

    /**
     * Update rocks position and creates more rocks when
     * all of them are destroyed.
     */
    private void updateRocks() {
        for (int i = 0; i < rockSplits.length; i++) {
            if (i < rockAmount && rocks[i] != null) {
                rocks[i].update();
            }
            if (rockSplits[i] != null && rockSplitActive[i] == true) {
                rockSplits[i].update();
            }
        }
        if (rocksLeft == 0) {
            level += 0.2;
            createRocks();
            createRockSplits();
        }
    } // updateRocks

    /**
     * Stops the game and set up the game over screen.
     */
    private void gameOver() {
        if (points > highScore) {
            highScore = points;
        }
        scoreUpdater(highScore, highScoreString, highScoreDisplay);
        clearGame();
        stop();
        this.getChildren().addAll(gameOverImage, newGame, highScoreText, highScoreDisplay);
        scoreText.setX(270);
        scoreText.setY(250);
        scoreDisplay.setLayoutX(372);
        scoreDisplay.setLayoutY(250);
    }

    /**
     * Removes Game Over Screen and restarts the game.
     */
    private void newGamePressed() {
        this.getChildren().removeAll(gameOverImage, newGame, highScoreText, highScoreDisplay,
                scoreText, scoreDisplay);
        init();
        play();
    }

    /**
     * Resets and removes rocks and projectiles.
     */
    private void clearGame() {
        this.player = null;
        this.rotation = 0.0;
        level = 1;
        for (int i = 0; i < rocks.length; i++) {
            if (rocks[i] != null) {
                this.getChildren().remove(rocks[i]);
                rocks[i] = null;
            }
        }
        for (int i = 0; i < rockSplits.length; i++) {
            if (rockSplits[i] != null) {
                this.getChildren().remove(rockSplits[i]);
                rockSplits[i] = null;
            }
        }
        for (int i = 0; i < projectiles.length; i++) {
            if (projectiles[i] != null) {
                this.getChildren().remove(projectiles[i]);
                projectiles[i] = null;
            }
            if (rotationRads[i] > 0) {
                rotationRads[i] = 0;
            }
        }
    } // clearGame

    /**
     * Turns the score into a string and updates the score display.
     * @param points score
     * @param updatedString points stored as a string
     * @param display the Label that the updatedString is stored on
     */
    private void scoreUpdater(int points, String updatedString, Label display) {
        updatedString = String.valueOf(points);
        display.setText(updatedString);
    }

    /**
     * Removes Start Screen, calls init(), starts the game.
     */
    private void playGame() {
        playPressed = true;
        this.getChildren().removeAll(startTitle, playButton, spaceship, controls);
        init();
    } // playGame

    /**
     * Creates a start screen.
     */
    private void makeStartScreen() {

        // Creating the "ASTEROIDS" title
        startTitle = new ImageView("file:src/main/resources/sprites/asteroidsTitle.png");
        startTitle.setPreserveRatio(true);
        startTitle.setFitWidth(500);
        startTitle.setX(70);
        startTitle.setY(120);

        // Creating the play button
        playButton = new Button();
        playGraphic = new ImageView("file:src/main/resources/sprites/play.png");
        playGraphic.setPreserveRatio(true);
        playGraphic.setFitWidth(220);
        playButton.setGraphic(playGraphic);
        playButton.setBackground(background);
        playButton.setLayoutX(200);
        playButton.setLayoutY(280);
        EventHandler<ActionEvent> playHandler = (e) -> playGame();
        playButton.setOnAction(playHandler);

        // Creating a spaceship
        spaceship = new ImageView("file:src/main/resources/sprites/player.png");
        spaceship.setPreserveRatio(true);
        spaceship.setFitWidth(30);
        spaceship.setFitHeight(30);
    } // makeStartScreen

    /**
     * Creates a Game Over Screen.
     */
    private void makeGameOverScreen() {

        // Creating Game Over text
        gameOverImage = new ImageView("file:src/main/resources/sprites/GameOver.png");
        gameOverImage.setPreserveRatio(true);
        gameOverImage.setFitWidth(480);
        gameOverImage.setX(80);
        gameOverImage.setY(30);

        // Creating New Game Button
        newGameText = new ImageView("file:src/main/resources/sprites/New Game.png");
        newGameText.setPreserveRatio(true);
        newGameText.setFitWidth(240);
        newGame = new Button();
        newGame.setBackground(background);
        newGame.setGraphic(newGameText);
        EventHandler<ActionEvent> newGameHandler = (e) -> newGamePressed();
        newGame.setOnAction(newGameHandler);
        newGame.setLayoutX(200);
        newGame.setLayoutY(370);
    } // makeGameOverScreen

    /**
     * Creates a scoreboard.
     */
    private void makeScoreBoard() {

        // Creating Score
        scoreText = new ImageView("file:src/main/resources/sprites/Score.png");
        scoreText.setPreserveRatio(true);
        scoreText.setFitWidth(100);
        scoreDisplay = new Label("0");
        scoreDisplay.setTextFill(Color.WHITE);
        scoreDisplay.setFont(font);

        // Creating High Score
        highScoreText = new ImageView("file:src/main/resources/sprites/highScore.png");
        highScoreText.setPreserveRatio(true);
        highScoreText.setFitWidth(140);
        highScoreDisplay = new Label("0");
        highScoreDisplay.setTextFill(Color.WHITE);
        highScoreDisplay.setFont(font);
        highScoreText.setX(250);
        highScoreText.setY(300);
        highScoreDisplay.setLayoutX(392);
        highScoreDisplay.setLayoutY(300);
    } // makeScoreBoard

    /**
     * Iterates through all projectiles and calls shoot() method on them.
     */
    private void updateProjectiles() {
        for (int i = 0; i < projectiles.length; i++) {
            if (projectiles[i] != null) {
                shoot(projectiles[i], rotationRads[i]);
            }
        }
    } // updateProjectiles

    /**
     * Creates smaller rock splits.
     */
    private void createRockSplits() {
        double levelAdjustedX = level;
        double levelAdjustedY = level;
        for (int i = 0; i < rockSplits.length; i++) {
            rockdx = rng.nextDouble();
            rockdy = rng.nextDouble();
            negdx = rng.nextBoolean();
            negdy = rng.nextBoolean();
            is0 = rng.nextBoolean();
            if (negdx) {
                rockdx *= -1;
                levelAdjustedX *= -1;
            }
            if (negdy) {
                rockdy *= -1;
                levelAdjustedY *= -1;
            }
            if (rockdx == 0 && rockdy == 0) {
                if (is0) {
                    rockdx += levelAdjustedX;
                } else {
                    rockdy += levelAdjustedY;
                }
            } else if (rockdx == 0 && rockdy != 0) {
                rockdy += levelAdjustedY;
            } else if (rockdy == 0 && rockdx != 0) {
                rockdx += levelAdjustedX;
            } else {
                rockdx += levelAdjustedX;
                rockdy += levelAdjustedY;
            }
            rockSplitActive[i] = false;
            rockSplits[i] = new Rock(this, rockdx, rockdy);
        }

    } // createRockSplits

    /**
     * Adds smaller rocks when big rock gets destroyed.
     * @param rockNum index of the rock in the rock array.
     */
    private void addRockSplits(int rockNum) {
        int rockSplitNum = rockNum * 2;
        if (rockSplits[rockSplitNum] != null) {
            rockSplits[rockSplitNum].setX(rocks[rockNum].getX());
            rockSplits[rockSplitNum].setY(rocks[rockNum].getY());
            rockSplits[rockSplitNum + 1].setX(rocks[rockNum].getX());
            rockSplits[rockSplitNum + 1].setY(rocks[rockNum].getY());
            this.getChildren().addAll(rockSplits[rockSplitNum], rockSplits[rockSplitNum + 1]);
            rockSplitActive[rockSplitNum] = true;
            rockSplitActive[rockSplitNum + 1] = true;
        }
    } // addRockSplits

    /**
     * Limits the amount of projectiles allowed to be on screen.
     */
    private void checkProjectileOverload() {
        for (int i = projectiles.length / 2; i < projectiles.length; i++) {
            if (projectiles[i] != null) {
                projectileOverload = true;
                for (int j = 0; j < projectiles.length; j++) {
                    if (projectiles[j] != null) {
                        this.getChildren().remove(projectiles[j]);
                        projectiles[j] = null;
                    }
                }
                projectileOverload = false;
            }
        }
    } // checkProjectileOverload

    /**
     * Rotates the player to the left.
     */
    private void rotateLeft() {
        isKeyPressed(KeyCode.LEFT, () -> {
            if (player != null) {
                rotation += -2;
                player.setRotate(rotation);
            }
        });
    } // rotateLeft

    /**
     * Rotates the player to the right.
     */
    private void rotateRight() {
        isKeyPressed(KeyCode.RIGHT, () -> {
            if (player != null) {
                rotation += +2;
                player.setRotate(rotation);
            }
        });
    } // rotateRight

    /**
     * Moves the player.
     */
    private void move() {
        isKeyPressed(KeyCode.UP, () -> {
            if (player != null) {
                double rotationRad = (rotation * Math.PI) / 180;
                player.setX(player.getX() + (3 * Math.sin(rotationRad)));
                player.setY(player.getY() - (3 * Math.cos(rotationRad)));
            }
        });
    } // move

} // Asteroids
