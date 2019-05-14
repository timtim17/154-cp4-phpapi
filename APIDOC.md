# MessageBoard API Documentation

The message board API keeps track of messages posted to it. A message board is a collection of short
strings. A user can GET all of the messages on the board, or POST one to it if they have the proper
authentication.

## [GET] /messageboard.php
**Request Format:** /messageboard.php

**Request Type:** GET

**Returned Data Format**: JSON

**Description:**
Responds with an array of every message on the message board. If there are no messages, an empty
array is sent back. There are no required parameters.

**Example Request:** /messageboard.php

**Example Response:**
```json
[
    "Mowgli <3 Debug Duck",
    "CSE 154 is awesome!"
]
```

**Error Handling:**
None

## [POST] /messageboard.php
**Request Format:** /messageboard.php

**Request Type**: POST

**Returned Data Format**: JSON

**Description:**
Takes a message via POST and adds it to the message board. Parameters must be sent within the body
of the request as form-data. Requires authentication: a valid API key/password must be provided
within the `auth` parameter.

**Example Request:** /messageboard.php

**Request Body: form-data**

| Parameter Name | Value                 |
|----------------|-----------------------|
| message        | Mowgli loves CSE 154! |
| auth           | mowgli_dash           |

**Example Response:**
```json
{
    "status": 200
}
```

**Error Handling:**
Responds with HTTP 400 if the auth key is incorrect, if the message is too short, or if either of
those parameters are missing.
