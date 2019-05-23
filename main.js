/**
 * @name Austin Jenchi
 * CSE 154 19sp AQ
 * @date 05/14/2019
 * Basic Javascript to get messages from the backend and add them to the message board page.
 */
(function() {
    "use strict";

    const API_URL = "messageboard.php";
    const API_AUTH = "mowgli_dash";
    const CLASS_ANIMATE = "animate";
    const CLASS_HIDDEN = "hidden";
    const CLASS_MESSAGE = "message";

    window.addEventListener("load", init);

    /**
     * Sets up event listeners, fetches messages to populate the page, and triggers animations.
     */
    function init() {
        qs("header").classList.add(CLASS_ANIMATE);
        qs("footer").classList.add(CLASS_ANIMATE);
        qsa("body > section").forEach(ele => ele.classList.add(CLASS_ANIMATE));
        id("btn-post").addEventListener("click", postMessage);

        fetch(API_URL)
            .then(checkStatus)
            .then(JSON.parse)
            .then(populateMessages)
            .catch (() => addMessage("Sorry, there was an error... reload?"));
    }

    /**
     * Using the response from the API add all of the messages to the page.
     *
     * @param {object} data - The response from the API
     */
    function populateMessages(data) {
        for (let i = 0; i < data.length; i++) {
            addMessage(data[i], i);
        }
    }

    /**
     * Adds a message to the page. Creates an element for it and adds it as a child to the proper
     * DOM node.
     *
     * @param {string} message - The message to add
     * @param {number} index - The index of the message in the server
     * @param {number} [delay=2000] - An optional delay in ms for the element to animate in; by
     *                                  default the messages animate in after a 2 second delay
     */
    function addMessage(message, index, delay=2000) {
        let anchorParent = document.createElement("a");
        anchorParent.href = "specific.html?index=" + index;
        let ele = document.createElement("section");
        ele.classList.add(CLASS_MESSAGE);
        ele.innerText = message;
        let rotate = Math.random() * 20 - 10;
        // animate the scaling of the element by setting a custom css property after a timeout
        // the original value of this is set in the css - 0.0
        ele.style.transform = "rotate(" + rotate + "deg) scale(var(--grow))";
        anchorParent.appendChild(ele);
        qs("main").appendChild(anchorParent);
        setTimeout(() => ele.style.setProperty("--grow", 1), delay);
    }

    /**
     * Sends the given message to the server. Clears the textbox once it has been sent. Also adds
     * the message to the page. Expects to be called from a click listener on a button.
     *
     * @param {MouseEvent} event - The click event from the event listener.
     */
    function postMessage(event) {
        let msg = id("in-msg").value;
        if (msg.length > 0) {   // don't prevent default before form validation
            event.preventDefault();
            let formData = new FormData(qs("form"));
            formData.append("auth", API_AUTH);
            let options = {
                method: "POST",
                body: formData
            };
            fetch(API_URL, options)
                .then(checkStatus)
                .then(JSON.parse)
                .then(data => addMessage(msg, data.index, 0))
                .then(() => id("in-msg").value = "")
                .then(() => {
                    let error = id("fetch-error");
                    if (!error.classList.contains(CLASS_HIDDEN)) {
                        error.classList.add(CLASS_HIDDEN);
                    }
                })
                .catch(() => id("fetch-error").classList.remove(CLASS_HIDDEN));
        }
    }

    /* CSE 154 HELPER FUNCTIONS */

    /**
     * Returns the DOM element with the given id.
     *
     * @param {string} id - The id to search for
     * @returns {HTMLElement} The element with that id
     */
    const id = id => document.getElementById(id);

    /**
     * Returns the first element in the DOM tree that matches the given selector.
     *
     * @param {string} selector - The selector to search with
     * @returns {HTMLElement} The first element in the DOM that matches that selector
     */
    const qs = selector => document.querySelector(selector);

    /**
     * Returns all the elements in the DOM that match the given selector.
     *
     * @param {string} selector - The selector to search with
     * @returns {HTMLElement[]} All elements in the DOM that match that selector
     */
    const qsa = selector => document.querySelectorAll(selector);

    /**
     * Helper function to return the response's result text if successful, otherwise
     * returns the rejected Promise result with an error status and corresponding text
     *
     * @param {object} response - response to check for success/error
     * @returns {object} - valid result text if response was successful, otherwise rejected
     *                     Promise result
     */
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }
})();
