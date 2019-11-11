//**** PLACES ERROR CODES ****///

// OK indicates that no errors occurred; the place was successfully detected and at least one result was returned.
// ZERO_RESULTS indicates that the search was successful but returned no results. This may occur if the search was passed a latlng in a remote location.
// OVER_QUERY_LIMIT indicates that you are over your quota.
// REQUEST_DENIED indicates that your request was denied, generally because of lack of an invalid key parameter.
// INVALID_REQUEST generally indicates that a required query parameter (location or radius) is missing.
// UNKNOWN_ERROR i)
import { selectRandomIndexFromList } from "../Helpers/RandomSelect";

export const placesTextSearchAPI = async (APIClient, request, callback) => {
  await APIClient.textSearch(request, async (results, status) => {
    if (status !== "OK") {
      //Error - handle error case
      return callback({}, status);
    }
    return callback(results, status);
  });
};

export const decideWinningLocation = (results, selectedWinner, callback) => {
  // All locations will have data and status -> if no data is returned the data will be an empty object .

  //Filter results so only results with data are available for analysis
  //3 Scenarios to cover
  const filteredResults = Object.keys(results)
    .map(uid => ({ ...results[uid], uid }))
    .filter(result => result.status === "OK");

  //1. Data for winner exists => return location from winners list
  if (results[selectedWinner].status === "OK") {
    //TODO: analyse Data to select the best place (maximising the choices of others)
    return callback(results[selectedWinner].data[0], selectedWinner, null);

    //
  } else if (filteredResults.length > 0) {
    //2. No Data for winner but data for other users => change winner to one with data, return location from new winners list
    //select new winner
    const winnerData = filteredResults[selectRandomIndexFromList(filteredResults)];
    return callback(winnerData.data[0], winnerData.uid, null);

    //
  } else {
    //3. No Data for any Players => show error
    return callback({}, selectedWinner, "No Data");
  }
};
