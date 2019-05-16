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
Takes a message via POST and adds it to the message board. Responds with the index at which the
message was addded, useful for the GET at index endpoint. Parameters must be sent within the body
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
    "status": 200,
    "index": 3
}
```

**Error Handling:**
Responds with HTTP 400 if the auth key is incorrect, if the message is too short, or if either of
those parameters are missing.

## [GET] /messageboard.php?index
**Request Format:** /messageboard.php?index=[number]

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:**
Responds with the message on the board at the given index.

**Example Request:** /messageboard.php?index=0

**Example Response:**
```
Mowgli <3 Debug Duck
```

**Error Handling:**
Responds with HTTP 400 if the index is out of bounds, either less than zero or higher than the
number of messages available.
