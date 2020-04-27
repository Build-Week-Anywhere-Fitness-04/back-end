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

>### POST /api/auth/instructors/login
>### POST /api/auth/clients/login
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
>### GET /api/classes/
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
    }
]
```

# Instructors routes
# Clients routes