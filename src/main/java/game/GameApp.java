package game;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.VBox;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class GameApp extends Application {

    /**
     * Constructs an {@code OmegaApp} object. This default (i.e., no argument)
     * constructor is executed in Step 2 of the JavaFX Application Life-Cycle.
     */
    public GameApp() {}

    /** {@inheritDoc} */
    @Override
    public void start(Stage stage) {

        // Asteroids Game
        Asteroids game = new Asteroids(640, 480);

        // setup scene
        VBox root = new VBox(game);
        Scene scene = new Scene(root);

        // setup stage
        stage.setTitle("Asteroids");
        stage.setScene(scene);
        stage.setOnCloseRequest(event -> Platform.exit());
        stage.sizeToScene();
        stage.show();

        // play the game
        game.play();

    } // start

} // OmegaApp
