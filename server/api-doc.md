# Kanban Board

## Endpoint List

## 1. User

### a. Register

- **URL** : `/users/register`
- **Method** : `POST`
- **Data Params** :
    ```
    name=string (required)
    email=string (required)
    password=string (required)
    ```

  _Request Header_
  ```

  ```

  _Request Body_
  ```
  {
    "name": "<input name>"
    "email": "<input email with email format>",
    "password": "<input password>"
  }
  ```

- **Success Response**

  _Response(201 - Created)_
  ```
  {
    "id": <given id by system>,
    "name": "<user-name>"
    "email": "<user-email>"
  }
  ```

- **Error Response**

  _Response(400 - Bad Request)_
  ```
  {
    "errors": [
      "Email already registered"
    ]
  }
  ```
  
  _Response(400 - Bad Request)_
  ```
  {
    "errors": [
      "Your password must be at least 6 characters long, contain at least one number, one lowercase alphabet, and one uppercase alphabet!",
      "Name should not be empty",
      "Email address must be valid"
    ]
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

### b. Login

- **URL** : `/users/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string (required)
    password=string (required)
    ```

  _Request Header_
  ```

  ```

  _Request Body_
  ```
  {
    "email": "<input email with email format>",
    "password": "<input password>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": "<user-id>",
    "name": "<user-name>"
    "email": "<user-email>",
    "access_token": "<user-access-token>"
  }
  ```

- **Error Response**

  _Response(400 - Bad Request)_
  ```
  {
    "errors": "Invalid email or password. Please try again!"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

## 2. Task

### a. Add Task
> Create new task

input format :

| key         | value                             |
|-------------|-----------------------------------|
| title       | req.body.title                    |
| description | req.body.description              |
| UserId      | req.decoded.id                    |


- **URL** : `/tasks`
- **Method** : `POST`
- **Data Params** :
    ```
    title=string (required)
    description=string,
    category=string
    ```

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "title": "<input task title>",
    "description": "<input task description>",
    "category": "<input task category>"
  }
  ```

- **Success Response**

  _Response(201 - Created)_
  ```
  {
    "id": <given id by system>,
    "title": "<task-title>",
    "description": "<task-description>",
    "category": "<task-category>"
    "UserId": <user-id who created task>
    "updatedAt": "2021-02-01T14:04:28.924Z",
    "createdAt": "2021-02-01T14:04:28.924Z",
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid access token"
  }
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "errors": [
      "Task title should not be empty",
      "The length of the description can't be more than 255 characters!"
    ]
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

### Show All Task

| key         | value                             |
|-------------|-----------------------------------|
| id          | auto increment primary key        |
| title       | task title (string)               |
| description | task description (string)         |
| category    | task category (string)            |
| UserId      | foreign key of User.id            |
| createdAt   | time when data was created (date) |
| updatedAt   | time when data was updated (date) |


- **URL** : `/tasks`
- **Method** : `GET`

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```

  _Request Body_
  ```

  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  [
    {
        "id": 1,
        "title": "<task title 1>",
        "description": "<task description 1>",
        "category": "<task category 1>",
        "UserId": <user-id who created task 1>,
        "createdAt": "2021-02-09T10:54:20.633Z",
        "updatedAt": "2021-02-09T10:54:20.633Z",
        "User": {
          "id": <user-id who created task 1>,
          "name": "<user-name who created task 1>",
          "email": "<user-email who created task 1>"
        }
    },
    {
        "id": 2,
        "title": "<task title 2>",
        "description": "<task description 2>",
        "category": "<task category 2>",
        "UserId": <user-id who created task 2>,
        "createdAt": "2021-02-09T10:54:41.510Z",
        "updatedAt": "2021-02-09T10:54:41.510Z",
        "User": {
          "id": <user-id who created task 2>,
          "name": "<user-name who created task 2>",
          "email": "<user-email who created task 2>"
        }
    },
    {
        "id": 3,
        "title": "<task title 3>",
        "description": "<task description 3>",
        "category": "<task category 3>",
        "UserId": <user-id who created task 3>,
        "createdAt": "2021-02-09T10:55:16.134Z",
        "updatedAt": "2021-02-09T10:55:16.134Z",
        "User": {
          "id": <user-id who created task 3>,
          "name": "<user-name who created task 3>",
          "email": "<user-email who created task 3>"
        }
    }
  ]
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid access token"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

---

### Show One Task
> Show one task by id

| key         | value                             |
|-------------|-----------------------------------|
| id          | auto increment primary key        |
| title       | task title (string)               |
| description | task description (string)         |
| category    | task category (string)            |
| UserId      | foreign key of User.id            |
| createdAt   | time when data was created (date) |
| updatedAt   | time when data was updated (date) |

- **URL** : `/tasks/:id`
- **Method** : `GET`
- **URL Params** : `id=integer`

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```

  _Request Body_
  ```

  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": <params-id>,
    "title": "<task title>",
    "description": "<task description>",
    "category": "<task category>",
    "UserId": <user-id who created task>,
    "createdAt": "2021-02-09T10:55:16.134Z",
    "updatedAt": "2021-02-09T10:55:16.134Z"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid access token"
  }
  ```

  _Response(404 - Not Found)_
  ```
  {
    "errors": "Task not found!"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

### Update Task
> Update task by id

- **URL** : `/tasks/:id`
- **Method** : `PUT`
- **URL Params** : `id=integer`
- **Data Params** :
    ```
    title=string (required)
    description=string
    ```

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "title": "<updated-title>",
    "description": "<updated-description>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": <params-id>,
    "title": "<updated task title>",
    "description": "<updated task description>",
    "category": "<task category>",
    "UserId": <user-id who created task>,
    "createdAt": "2021-02-09T10:55:16.134Z",
    "updatedAt": "2021-02-09T10:55:16.134Z"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid access token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to perform this action"
  }
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "errors": [
      "Task title should not be empty",
      "The length of the description can't be more than 255 characters!"
    ]
  }
  ```

  _Response(404 - Not Found)_
  ```
  {
      "errors": "Task not found!"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

### Update Task Category
> Update task category by id

- **URL** : `/tasks/:id`
- **Method** : `PATCH`
- **URL Params** : `id=integer`
- **Data Params** :
    ```
    category=string (required)
    ```

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "category": "<updated category>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": <params-id>,
    "title": "<task title>",
    "description": "<task description>",
    "category": "<updated task category>",
    "UserId": <user-id who created task>,
    "createdAt": "2021-02-09T10:55:16.134Z",
    "updatedAt": "2021-02-09T10:55:16.134Z"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid access token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to perform this action"
  }
  ```

  _Response(404 - Not Found)_
  ```
  {
      "errors": "Task not found!"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

### Delete One Task
> Delete task by id

- **URL** : `/tasks/:id`
- **Method** : `GET`
- **URL Params** : `id=integer`

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```

  _Request Body_
  ```

  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "deleted_task": {
      "id": <params-id>,
      "title": "<task title>",
      "description": "<task description>",
      "category": "<task category>",
      "UserId": <user-id who created task>,
      "createdAt": "2021-02-09T10:55:16.134Z",
      "updatedAt": "2021-02-09T10:55:16.134Z"
    },
    "message": "Successfully delete task"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid access token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to perform this action"
  }
  ```

  _Response(404 - Not Found)_
  ```
  {
    "errors": "Task not found!"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```
