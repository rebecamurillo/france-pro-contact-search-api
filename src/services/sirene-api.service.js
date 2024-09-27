const axios = require('axios');
const logger = require('../utils/logger');

async function findBySiren(siren) {
    return await axios.get('https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/'
     + siren).then(function (response) {
        if (!response.data || !response.data.unite_legale ) return null;
        return response.data.unite_legale;
    })
    .catch(function (error) {
        logger.warn("Error calling SIRENE api", error);
        return null;
    });
}

async function findBySiret(siret){
    return await axios.get('https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/'
    + siret).then(function (response) {
       if (!response.data || !response.data.etablissement ) return null;
       return response.data.etablissement;
   })
   .catch(function (error) {
       logger.warn("Error calling SIRENE api", error);
       return null;
   });
}

async function findCompanyNameAndAddress(siret, siren){
    let companyData = null;

    if (siret){
        const etablissement = await findBySiret(siret);
        if (etablissement == null) return null;
        companyData = {
            name: etablissement.unite_legale.denomination,
            address: etablissement.geo_adresse
        }
    }else if (siren){
        const uniteLegale = await findBySiren(siren);
        if (!uniteLegale) return null;
        companyData = {
            name: uniteLegale.denomination,
            address: uniteLegale.etablissement_siege.geo_adresse
        }
    }
    return companyData;
}

module.exports = findCompanyNameAndAddress;