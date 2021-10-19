# <p align="center">Water My Plants API</p>

## <p align="center">https://build-week-water-my-plants-1.herokuapp.com/</p>

## <p align="center">REGISTER / LOGIN</p>

### <p align="center">User examples:</p>

```json
[
  {
    "username": "jimhalpert",
    "password": "randompassword",
    "phoneNumber": "+19871234567"
    
  },
  {
    "username": "pambeesly",
    "password": "anotherrandompassword",
    "phoneNumber": "+11234567890"
  },
  {
    "username": "dwightschrute",
    "password": "somethingrandom",
    "phoneNumber": "+198765436789"
  }
]
```

### [POST] /api/auth/register

- Register a new user
  - _username required (must be a string | unique)_
  - _password required (must be a string)_
  - _phoneNumber required (must be a string | unique)_

_What you send:_

```json
{
  "username": "jimHalpert",
  "password": "password123",
  "phoneNumber": "+12340987654"
}
```

_What you receive:_

```json
{
  "message": "successfully created an account with the username jimHalpert"
}
```

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.

**Heroku Scripts**

- **deploy**: Deploys the main branch to Heroku.
- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.
