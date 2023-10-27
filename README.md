# Exercise Tracker

A Node.js microservice using Express and MongoDB Atlas to provide REST APIs for CRUD operations on user exercise data. Implements endpoints for tracking workout sessions, and retrieving user workout logs.

## Live Demo

Check out the microservice [here](https://exercisetracker-expressjs.fly.dev/).

## API Usage

### 1. Add a new user

- Endpoint: `POST /api/users` x-www-form-urlencoded `username: String`
- Description: Adds a new user to the database.
- Usage: `POST /api/users` x-www-form-urlencoded `username=test_username`
- Response:

```
{
    username: "test_username",
    _id: "653bf7c37595f1d6xxxxxxxx"
}
```

### 2. Retrieve all users

- Endpoint: `GET /api/users`
- Description: Retrieves all users from the database.
- Usage: `GET /api/users`
- Response:

```
[
    {
        username: "test_username",
        _id: "653bf7c37595f1d6xxxxxxxx"
    }
]
```

### 3. Track a workout session

- Endpoint: `POST /api/users/:_id/exercises` x-www-form-urlencoded `description: String, duration: Number, date: Date`
- Description: Adds a new workout session to the database associated with the user with the given `_id`.
- Usage: `POST /api/users/653bf7c37595f1d6xxxxxxxx/exercises` x-www-form-urlencoded `description=test_description&duration=10&date=2021-01-01`
- Response:

```
{
    username: "test_username",
    description: "test_description",
    duration: 10,
    _id: "653bf7c37595f1d6xxxxxxxx",
    date: "Fri Jan 01 2021"
}
```

### 4. Retrieve user workout logs

- Endpoint: `GET /api/users/:_id/logs?from=Date&to=Date&limit=Number`
- Description: Retrieves the workout logs of the user with the given `_id`. The `from` and `to` parameters are optional, and can be used to filter the logs by date. The `limit` parameter is optional, and can be used to limit the number of logs returned.
- Usage: `GET /api/users/653bf7c37595f1d6xxxxxxxx/logs?from=2021-01-01&to=2021-01-31&limit=10`
- Response:

```
{
    username: "test_username",
    count: 1,
    _id: "653bf7c37595f1d6xxxxxxxx",
    log: [
        {
            description: "test_description",
            duration: 10,
            date: "Fri Jan 01 2021"
        }
    ]
}
```

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Jest
- fly.io

## Run locally

```
npm install
npm start
```

## Deploy on fly.io

```
fly launch
fly deploy
```
