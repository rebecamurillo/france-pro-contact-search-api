var findCompanyDataService = require('../services/company.service.js');
var httpStatus = require('http-status-codes');
const logger = require('../utils/logger');

async function  findCompanyData(req, res, next) {
    if (req.query && (req.query.name || req.query.address || req.query.siret || req.query.siren )){
        let response;
        try {
            response = await findCompanyDataService(req.query);
            return res.status(response.httpStatus).send(response.data);
        }
        catch(err) {
            logger.error("Error in findCompanyData Controller", err);
            return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
        
    }else{
        res.status(400).send('At least one of the following params expected in query : siret, siren, name, address')
    }
}
module.exports = findCompanyData;