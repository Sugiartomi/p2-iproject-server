# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /google-oauth`
- `POST /register`
- `GET /quote`
- `GET /report`
- `GET /report/:id`
- `POST /report`
- `PATCH /report/:id`
- `DELETE /report/:id`

&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Created)_

```json
{
{
    "access_token": "string",

  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Email must be formatted"
}
```

&nbsp;

## 2. POST /register

Request:

- body:

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
{
    "id": "string",
    "role" : "string"

  }
}
```
```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Email must be formatted"
}
```


&nbsp;

## 3. get /quote

Request:

```json
{
  "access_token" : "string"
}
```

_Response (200 - OK)_

```json
{
{
    "quote": "string",
    "author" : "string"

  }
}
```

&nbsp;

## 4. post /report

headers : 

```json
{
  "access_token" : "string"
}
```
Response 200 - OK
```json
[
    {
        "id": 1,
        "title": "banjir tahunan",
        "description": "Permukiman warga kawasan Kebon Pala, Kelurahan Kampung Melayu, Kecamatan Jatinegara, Jakarta Timur, kembali terendam banjir luapan Kali Ciliwung.Ketinggian air sekarang sekitar satu meter. Banjir karena air kiriman dari Bogor dan Depok",
        "victim": 300,
        "status": "pending",
        "location": "jakarta",
        "UserId": 2,
        "createdAt": "2022-08-17T01:51:32.748Z",
        "updatedAt": "2022-08-17T01:51:32.748Z"
    }
]
```
Response 400 -Bad

```json
{
  "message" : "title is required"
},
OR
{
  "message" : "victim is required"
},
OR
{
  "message" : "description is required"
},
OR
{
  "message" : "location is required"
},
```


&nbsp;

## 5. get /report

headers : 

```json
{
  "access_token" : "string"
}
```
Response 200 - OK
```json
[
    {
        "id": 1,
        "title": "banjir tahunan",
        "description": "Permukiman warga kawasan Kebon Pala, Kelurahan Kampung Melayu, Kecamatan Jatinegara, Jakarta Timur, kembali terendam banjir luapan Kali Ciliwung.Ketinggian air sekarang sekitar satu meter. Banjir karena air kiriman dari Bogor dan Depok",
        "victim": 300,
        "status": "pending",
        "location": "jakarta",
        "UserId": 2,
        "createdAt": "2022-08-17T01:51:32.748Z",
        "updatedAt": "2022-08-17T01:51:32.748Z"
    }
]
```
Response 400 -Bad

```json
{
  "message" : "title is required"
},
OR
{
  "message" : "victim is required"
},
OR
{
  "message" : "description is required"
},
OR
{
  "message" : "location is required"
},
```



````json
_Response (400 - BAD)_

```json
{
"message" : "please login",
}

_Response (403 - FORBIDEN)_

```json
{
"message" : "you don't have permission to access this movie",
}

## GLOBAL Error
_Response (500 - SERVER)_

```json
{
"message" : "Internal server error!",
}
````
