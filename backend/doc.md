# FrameOff Backend Documentation

## Overview

This API serves as the backend for the FrameOff application. It provides multiple endpoints that the client-side end can connect to in order to create, view, and vote on polls.

The backend is implemented using the following key languages/technologies/frameworks:

- TypeScript
- Express
- Node.js
- MongoDB/Mongoose
- AWS S3
- Multer

## Routes
### Creating a Duel

**Method:** `POST`
**Endpoint:** `/api/createduel`
**Description:** Creates and saves (to the database) a duel. 
**Example Request Body:** 

```json
{
  "title": "Sample Duel",
  "description": "This is a test duel",
  "slides": [
    {
      "slideTitle": "Slide 1",
      "slideDescription": "Description of Slide 1",
      "index": 1,
      "image1": {
        "url": "https://example.com/image1.jpg",
        "caption": "Image 1",
        "votes": 0
      },
      "image2": {
        "url": "https://example.com/image2.jpg",
        "caption": "Image 2",
        "votes": 0
      }
    },
    {
      "slideTitle": "Slide 2",
      "slideDescription": "Description of Slide 2",
      "index": 2,
      "image1": {
        "url": "https://example.com/image3.jpg",
        "caption": "Image 3",
        "votes": 0
      },
      "image2": {
        "url": "https://example.com/image4.jpg",
        "caption": "Image 4",
        "votes": 0
      }
    }
  ]
}
```

**Example Response Body:** 

```json
{
    "title": "Sample Duel",
    "_id": "VqbNGKec"
}
```

### Getting a Duel

**Method:** `GET`
**Endpoint:** `/api/:id`
**Description:** Gets all the information about an entire duel, including all the information of the slides it contains.
**URL Parameters:** `:id` - the ID of the poll.
**Example Response Body:** 

```json
{
    "title": "Sample Duel",
    "description": "This is a test duel",
    "slides": [
        {
            "_id": "******",
            "slideTitle": "Slide 1",
            "slideDescription": "Description of Slide 1",
            "index": 1,
            "image1": {
                "url": "https://example.com/image1.jpg",
                "caption": "Image 1",
                "votes": 2,
                "_id": "******"
            },
            "image2": {
                "url": "https://example.com/image2.jpg",
                "caption": "Image 2",
                "votes": 1,
                "_id": "******"
            },
            "__v": 0
        },
        {
            "_id": "******",
            "slideTitle": "Slide 2",
            "slideDescription": "Description of Slide 2",
            "index": 2,
            "image1": {
                "url": "https://example.com/image3.jpg",
                "caption": "Image 3",
                "votes": 0,
                "_id": "******"
            },
            "image2": {
                "url": "https://example.com/image4.jpg",
                "caption": "Image 4",
                "votes": 1,
                "_id": "******"
            },
            "__v": 0
        }
    ]
}
```

The `_id`s have been blurred out.

### Voting on an Individual Slide

**Method:** `PATCH`
**Endpoint:** `/api/createduel`
**Description:** Votes for one of two images on a given slide.
**Example Request Body:** 

```json
{
    "_id": "64bf3282713fa8ae9572a0???",
    "votedFor": "IMAGE1"
}
```

**Relevant Enums:**

```typescript
const VotedEnum = {
    IMAGE1: 'IMAGE1',
    IMAGE2: 'IMAGE2',
};
```

**Response:** Returns the current votes and their relevant percentages of the images. 
**Example Response Body:**

```json
{
    "votesImage1": 9,
    "votesPercent1": 69,
    "votesImage2": 4,
    "votesPercent2": 31
}
```

### Vote for All Slides of a Poll (Multiple Slides)

**Method:** `PATCH`
**Endpoint:** `/api/voteall`
**Description:** Votes for all slides in a given array of their IDs.
**Example Request Body:**

```json
{
  "votedSlides": [
    {
        "_id": "64bf3282713fa8ae9572a???",
        "votedFor": "IMAGE1"
    },
    {
        "_id": "64bf3282713fa8ae9572a???",
        "votedFor": "IMAGE2"
    }
  ]
}
```

**Response:** `OK` or returns an error.

### Get Results of a Slide

**Method:** `GET`
**Endpoint:** `/api/getvotes/:id`
**Description:** Gets the votes and relevant percentages of the two images of a specific slide.
**URL Parameters:** `:id` - the ID of the slide.
**Example Response Body:**

```json
{
    "votesImage1": 13,
    "votesPercent1": 76,
    "votesImage2": 4,
    "votesPercent2": 24
}
```

### Upload an Image

**Method:** `POST`
**Endpoint:** `/api/uploadimage`
**Description:** Uploads an image to the S3 bucket.
**Request:** Takes in an image in `FormData` format.
**Response:** Returns the public reference URL of the image. 

## Error Handling
- `404 NOT FOUND` - Resource was not found.
- `400 BAD REQUEST` - Request was invalid (i.e. missing parameters).
- `500 INTERNAL ERROR` - For any internal server error.

## Rate Limiting
Requests are limited to 1000 requests per minute per IP address.