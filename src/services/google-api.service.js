const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

/**
 * Find place from google place api with text 
 * Text should be company name AND/OR address
 * @param {*} input 
 * @returns The first place found with place id, formatted address and company name. Otherwise null if nothing found
 */
async function findPlaces(input) {
    return await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key='
    + process.env.GOOGLE_API_KEY
    + '&inputtype=textquery&fields=formatted_address,name,place_id&input='
    + input).then(function (response) {
        if (!response.data || !response.data.candidates || response.data.candidates.length == 0 ) return null;
        return response.data.candidates[0];
    })
    .catch(function (error) {
        logger.error("Error calling API Google", error);
    });
}

/**
 * Finds place detail containing contact information
 * @param {*} placeId 
 */
async function findPlaceDetails(placeId){
    return await axios.get('https://maps.googleapis.com/maps/api/place/details/json?key='
    + process.env.GOOGLE_API_KEY
    + '&place_id='
    +placeId).then(function (response){
        if (!response.data || !response.data.result ) return null;
        return response.data.result;
    });
}
/**
 * Finds company contact information
 * @param {*} nameAndAddressInput 
 * @returns Object containing company name, phone number, address. Null if nothing found
 */
async function getPlaceDataByNameAndAddress(nameAndAddressInput) {
    const placeFound = await findPlaces(nameAndAddressInput.toUpperCase());
    if (!placeFound || !placeFound.place_id) return null;

    const placeDetails = await findPlaceDetails(placeFound.place_id);
    if (!placeDetails) return null;

    return {
        name: placeDetails.name,
        address: placeDetails.formatted_address,
        phone: placeDetails.international_phone_number
    };
}

module.exports = getPlaceDataByNameAndAddress;