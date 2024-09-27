var httpStatus = require('http-status-codes');
var getPlaceDataByNameAndAddress = require('../services/google-api.service');
var findCompanyNameAndAddress = require('../services/sirene-api.service');
const logger = require('../utils/logger');
var removeAccents = require('remove-accents');

/*
    Calls SIRENE api to find company name and address
    Returns null if no data found
*/
async function findNameAndAddress(siret, siren){
    let company = findCompanyNameAndAddress(siret, siren);

    return  company;
}

/**
 * Function findCompanyDataService finds contact information for a company
 * Contact information (telephone) is retrieved from Google Place API
 * Search input is company name and address for more accurate results
 * If SIRET or SIREN is given, company name and address is retrieved from Sirene API
 * @param {*} params 
 * @returns Object containing response status code and data object with company name, address and phone number. 
 * NOT found error if no data found with parameters
 */
async function findCompanyDataService(params) {
    let result = {}
    try {
        let companyNameAddress = undefined;

        // find company name and address by siret or siren
        if (params.siret || params.siren){
            companyNameAddress = await findNameAndAddress(params.siret, params.siren);
        }
        // if no data found, try with name or address in query 
        if (!companyNameAddress){
            if (!params.name && !params.address){
                companyNameAddress = null;
            }else{
                companyNameAddress = { 
                    name : params.name?params.name:'entreprise',
                    address : params.address?params.address:''
                };  
            }          
        }
        if (companyNameAddress){
            const contactData = await getPlaceDataByNameAndAddress(removeAccents(companyNameAddress.name + ' ' + companyNameAddress.address));
            if (contactData){
                result = {httpStatus: httpStatus.StatusCodes.OK, status: "successful", data: contactData};
            }else{
                result = {httpStatus: httpStatus.StatusCodes.NOT_FOUND, status: "error"};
            }
        }else {
            result = {httpStatus: httpStatus.StatusCodes.NOT_FOUND, status: "error"};
        }
        return result;
    }   
    catch(err) {
        logger.error("Error in findCompanyDataService", err);
        result = {httpStatus: httpStatus.StatusCodes.BAD_REQUEST, status: "failed", error: err};
        return result;
    }
}



module.exports = findCompanyDataService;