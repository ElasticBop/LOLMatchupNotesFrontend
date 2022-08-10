import axios from "axios"
const API_URL = "http://localhost:8000/api/matchups/"

/**
 * Get the matchups for a given champino combo
 * @param championsData info about the champions in the matchup
 * @param token used to identify the current user
 * @returns a json object containing a list of matchups given the user and the champion matchup
 */
const getMatchups = async (championsData, token) => {
    const config = {
        params: {
            champion1: championsData.champion1,
            champion2: championsData.champion2
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get( API_URL, config )
    return response.data
}

/**
 * Create a matchup 
 * @param matchupData includes champion information and the info related to the matchup
 * @param token used to identify the current user
 * @returns a json object of the matchup that was created
 */
const createMatchup = async (matchupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, matchupData, config)
    return response.data
}

/**
 * Delete a matchup
 * @param {*} matchupId the id of the matchup
 * @param {*} token used to identify the current user
 * @returns the id of the deleted token
 */
const deleteMatchup = async (matchupId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + matchupId, config)
    return response.data
}

const matchupService = {
    getMatchups,
    createMatchup,
    deleteMatchup
}
export default matchupService