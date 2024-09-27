# pro-contact-api by Rebeca Murillo

Api finds contact information for a company. 
Contact information contains address and telephone number. 
Input in query are : address, name, siret, siren


## Installation in local repo
### Install

```bash
npm install
```
### Run 
```bash
npm start
```

### Tests 
```bash
npm test
```

## Run with Docker
### Mount image
```bash
docker build . -t rmurillo/pro-contact-api
```

### Run image
```bash
docker run -p 3000:3000 -d rmurillo/pro-contact-api
```

## Usage

Server is available in [localhost:3000](localhost:3000)

## Route
Available route localhost:3000/companies/contact

Parameters in query : 
| Query param | Description    |
| ----------- |:-----------:   |
|name         | company name   |
|address      | company address|
|siret        | company siret  |
|siren        | company siren  |

### Example
localhost:3000/companies/contact?name=EXPERDECO
