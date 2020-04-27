# Fitness Anywhere API

> ## https://fitness-anywhere.herokuapp.com/

# Auth
`Testing users:`
-               | username      | password      |
--------------- | ------------- | ------------- |
**instructor**  | michaelscott  | bestbossever  |
**client**      | ryanhoward    | forevertemp   |

## - Instructor and Client register and login routes

>### POST /api/auth/instructors/register
>### POST /api/auth/clients/register
```
Expects:
{
    username: <string>,
    password: <string>,
    first_name: <string>,
    last_name: <string>,
    email: <string>,
    phone: <string> // (Optional)
}
```
```
Returns:
{
    "id": <integer>
    "username": <string>
}
```
<br />

>#### POST /api/auth/instructors/login
>#### POST /api/auth/clients/login
```
Expects:
{
    username: <string>
    password: <string>
}

Returns:
{
    "token": <string>
}
```
<br />

> ## All the following routes require **`token`**
<br />

# Classes routes

## - Return all classes
>#### GET /api/classes/
```
Returns:
[
    {
        "id": <integer>,
        "instructor_id": <integer>,
        "name": <string>,
        "type": <string>,
        "start_time": <string>, // format: "2020-05-02 07:00"
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5']
        "status": <string>, // enum type: ['CONFIRMED','CANCELED']
        "price": <decimal>,
        "description": <string> || null,
        "duration": <integer> || null, // minutes
        "max_class_size": <integer> || null
    },
    ...
]
```
<br />

## - Return specific class
>#### GET /api/classes/:id
```
not implemented yet
```
<br />

## - Return intructor from specific class
>#### GET /api/classes/:id/instructor
```
not implemented yet
```
<br />

## - Return clients from specific class
>#### GET /api/classes/:id/clients
```
not implemented yet
```
<br />

# Instructors routes
## - Return all instructors
>#### GET /api/instructors
```
Returns:
[
    {
        "id": <integer>,
        "username": <string>,
        "password": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

## - Return instructor by ID
>#### GET /api/instructors/:id
```
Returns:
{
    "id": <integer>,
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> || null
}
```
<br />

> ## All the following routes require **`instructor token`**
<br />

## - Update instructor
>#### PUT /api/instructors/:id/
```
not implemented yet
```
<br />

## - Delete instructor
>#### DELETE /api/instructors/:id/
```
not implemented yet
```
<br />

## - Return instructor's classes
>#### GET /api/instructors/:id/classes
```
Returns:
[
    {
        "id": <integer>,
        "instructor_id": <integer>,
        "name": <string>,
        "type": <string>,
        "start_time": <string>, // format: "2020-05-02 07:00"
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5']
        "status": <string>, // enum type: ['CONFIRMED','CANCELED']
        "price": <integer>,
        "description": <string> || null,
        "duration": <integer> || null, // minutes
        "max_class_size": <integer> || null
    },
    ...
]
```
<br />

## - Add new class
>#### POST /api/instructors/:id/classes
```
expects:
{
    name: <string>,
    type: <string>,
    start_time: <string>, // format: "2020-05-02 07:00"
    location: <string>,
    intensity: <string>, // enum type: ['1','2','3','4','5']
    status: <string>, // enum type: ['CONFIRMED','CANCELED']
    price: <integer>,
    description: <string>, (Optional)
    duration: <integer>, (Optional) // minutes
    max_class_size: <integer> (Optional)
}
```
```
returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />

## - Return instructor's specific class
>#### GET /api/instructors/:id/classes/:class_id
```
returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />

## - Update class
>#### PUT /api/instructors/:id/classes/:class_id
```
expects:
{
    name: <string>,
    type: <string>,
    start_time: <string>, // format: "2020-05-02 07:00"
    location: <string>,
    intensity: <string>, // enum type: ['1','2','3','4','5']
    status: <string>, // enum type: ['CONFIRMED','CANCELED']
    price: <integer>,
    description: <string>, (Optional)
    duration: <integer>, (Optional) // minutes
    max_class_size: <integer> (Optional)
}
```
```
returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />

## - Delete class
>#### DELETE /api/instructors/:id/classes/:class_id
```
returns:
{
    "message": 'Class successfully deleted'
}
```
<br />

## - Return clients from specific class
>#### GET /api/instructors/:id/classes/:class_id/clients
```
returns:
[
    {
        "id": <integer>,
        "username": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

# Clients routes

> ## All the following routes require **`client token`**
<br />

## - Return all clients
>#### GET /api/clients
```
Returns:
[
    {
        "id": <integer>,
        "username": <string>,
        "password": <string>,
        "first_name": <string>,
        "last_name": <string>,
        "email": <string>,
        "phone": <string> || null
    },
    ...
]
```
<br />

## - Return specific clients
>#### GET /api/clients/:id
```
Returns:
{
    "id": <integer>,
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> || null
}
```
<br />

## - Delete client
>#### DELETE /api/clients/:id
```
Returns:
{
    "message": 'Client removed successfully'
}
```
<br />

## - Update client
>#### PUT /api/clients/:id
```
Expects:
{
    username: <string>
    first_name: <string>,
    last_name: <string>,
    email: <string>,
    phone: <string> (Optional)
}
```
```
Returns:
{
    "id": <integer>
    "username": <string>,
    "password": <string>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <string>,
    "phone": <string> (Optional)
}
```
<br />

## - Return client's classes
>#### GET /api/clients/:id/classes
```
Returns:
[
    {
        "id": <integer>,
        "instructor_id": <integer>,
        "name": <string>,
        "type": <string>,
        "start_time": <string>, // format: "2020-05-02 07:00"
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5']
        "status": <string>, // enum type: ['CONFIRMED','CANCELED']
        "price": <integer>,
        "description": <string> || null,
        "duration": <integer> || null, // minutes
        "max_class_size": <integer> || null
    },
    ...
]
```
<br />

## - Return specific class
>#### GET /api/clients/:id/classes/:class_id
```
Returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />


## - Register to class
>#### POST /api/clients/:id/classes
```
Expects:
{
    class_id: <integer>
}
```
```
Returns:
{
    "id": <integer>,
    "instructor_id": <integer>,
    "name": <string>,
    "type": <string>,
    "start_time": <string>, // format: "2020-05-02 07:00"
    "location": <string>,
    "intensity": <string>, // enum type: ['1','2','3','4','5']
    "status": <string>, // enum type: ['CONFIRMED','CANCELED']
    "price": <integer>,
    "description": <string> || null,
    "duration": <integer> || null, // minutes
    "max_class_size": <integer> || null
}
```
<br />

## - Remove class
>#### DELETE /api/clients/:id/classes/:class_id
```
Returns:
{
    "message": 'Class successfully deleted'
}
```
<br />