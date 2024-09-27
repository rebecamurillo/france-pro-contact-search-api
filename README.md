# pro-contact-api by Rebeca Murillo

Api finds contact information for a company. 
Contact information contains address and telephone number. 
To increase success result and accuracy, search is done in both Google Places API and SIRENE API.

- Input in query are : address, name, siret, siren
- Output expected is JSON with : email, address, phone data 

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

Output is a JSON with email, address and phone data.

```json
{
    "email": "",
    "address": {
        "street": "",
        "city": "",
        "postalCode": "",
        "country": ""
    },
    "phone": "+33199999999"
}
```

### Example
localhost:3000/companies/contact?name=EXPERDECO
