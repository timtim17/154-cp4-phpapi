<?php
    /**
     * @author Austin Jenchi
     * CSE 154 19sp AQ
     * @since 05/14/2019
     * Basic PHP backend server code. Handles file I/O to persist messages to disk. Responds to GET
     * requests with a list of all messages, and POST requests by saving the given message.
     */

    header("Content-Type: application/json");

    $AUTH_KEY = "mowgli_dash";
    $FILE_NAME = "messages.json";

    if (!file_exists($FILE_NAME)) {
        file_put_contents($FILE_NAME, "[]");
    }

    $messages = json_decode(file_get_contents($FILE_NAME));
    
    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        if (isset($_GET["index"])) {
            $idx = (int) $_GET["index"];
            if ($idx < 0 || $idx >= count($messages)) {
                error("Invalid parameter index: Index {$idx} out of bounds.");
            } else {
                echo json_encode(array("message" => $messages[$idx]));
            }
        } else {
            echo json_encode($messages);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "POST") {
        /* Fake auth: in a real scenario this would be some sort of authentication, probably
        based on API key. For simplicity's sake this is just going to be a fake key or
        password that every response will need to provide. */
        if (isset($_POST["auth"])) {
            if ($_POST["auth"] === $AUTH_KEY) {
                if (isset($_POST["message"])) {
                    $msg = $_POST["message"];
                    if (strlen($msg) > 0) {
                        array_push($messages, $msg);
                        file_put_contents($FILE_NAME, json_encode($messages));
                        echo json_encode(array("status" => 200, "index" => count($messages) - 1));
                    } else {
                        error("Invalid parameter message: Message too short.");
                    }
                } else {
                    error("Missing parameter message: Please provide a message.");
                }
            } else {
                error("Invalid parameter auth: Incorrect auth key.");
            }
        } else {
            error("Missing parameter auth: Please provide your auth key.");
        }
        
    } else {
        error("Invalid request method: Please use either GET or POST with the correct parameters.");
    }

    /**
     * Responds with an error message and HTTP 400 error code. Kills the rest of the program.
     *
     * @param string $msg an optional string to output stating what the error is
     */
    function error($msg="Unknown error.") {
        http_response_code(400);
        header("Content-Type: text/plain");
        die($msg);
    }
?>
