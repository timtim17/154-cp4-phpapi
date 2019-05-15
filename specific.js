/**
 * @author Austin Jenchi
 * CSE 154 19sp AQ
 * @date 05/14/2019
 * Pulls a message index from URL parameters, gets the relevant message from the backend, and shows
 * it on the page.
 */
(function() {
    "use strict";

    const API_URL = "messageboard.php";
    const URL_PARAM = "index";

    window.addEventListener("load", load);

    /**
     * On page load, get the value of the index in the URL, fetch the message,
     * and show it on the page.
     */
    function load() {
        /* access GET parameters based on a Stack Overflow answer
           https://stackoverflow.com/a/979995/1108513 */
        let url = new URL(location.href);
        if (url.searchParams.has(URL_PARAM)) {
            fetch(API_URL + "?index=" + url.searchParams.get(URL_PARAM))
                .then(checkStatus)
                .then(JSON.parse)
                .then(data => setMessage(data.message))
                .catch(() => setMessage("There was an error getting the message... reload?"));
        } else {
            setMessage("Somehow you got here in an invalid way... try again?"
                + " (P.S. you need a ?index=#)");
        }
    }

    /**
     * Shows the given message on the page and animates in the element.
     * This is only expected to be run once. There is no checking to verify that the
     * message contains anything at all or contains any malicious content.
     *
     * @param {string} message - The message to show
     */
    function setMessage(message) {
        let ele = qs("main");
        ele.innerText = message;
        let rotate = Math.random() * 20 - 10;
        ele.style.transform = "rotate(" + rotate + "deg) scale(1)";
    }

    /* CSE 154 HELPER FUNCTIONS */

    /**
     * Returns the first element in the DOM tree that matches the given selector.
     *
     * @param {string} selector - The selector to search with
     * @returns {HTMLElement} The first element in the DOM that matches that selector
     */
    const qs = selector => document.querySelector(selector);

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
