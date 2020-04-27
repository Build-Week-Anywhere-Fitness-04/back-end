# Fitness Anywhere API

> ## https://fitness-anywhere.herokuapp.com/

# Auth

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
    id: <integer>
    username: <string>
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
    token: <string>
}
```
<br />

> ## All the following routes require **`token`**
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
        "start_time": <string>, // format: "2020-05-02 07:00",
        "location": <string>,
        "intensity": <string>, // enum type: ['1','2','3','4','5'],
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

# Instructors routes
## - Return all instructors
>#### GET /api/instructors
```
[
    {
        "id": <integer>,
        "username": <string>,
        "password": <string>,
        "first_name": "Kevin",
        "last_name": "Malone",
        "email": "iwantcookies@dundermifflin.com",
        "phone": "5708794565"
    },
    ...
]
```
# Clients routes