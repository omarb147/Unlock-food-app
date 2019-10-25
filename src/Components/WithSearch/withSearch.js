import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { convertDistanceToUnits } from "../../Helpers/ConvertUnits";
import * as TYPES from "../../Constants/types";
import { withRedux } from "../../Redux";
import async from "async";
import * as ROUTES from "../../Constants/routes";

const withSearch = Component => {
  class WithSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [] };
      this.service = new window.google.maps.places.PlacesService(document.createElement("div"));
    }

    initiateAPISearch = async searchQuery => {
      const { placesSearchComplete, placesSearchLoading, placesSearchError, placesSearchClear } = this.props;
      // console.log(searchQuery);
      async.each(searchQuery, (item, callback) => this.searchAPI(item, callback), res => console.log("done"));
    };

    searchAPI = async (item, callback) => {
      const { placesSearchComplete, placesSearchLoading, placesSearchError } = this.props;
      const { query, latlng, radius, maxPrice, openNow, uid } = item;
      const request = {
        query,
        location: latlng,
        minPriceLevel: 0,
        maxPriceLevel: maxPrice,
        radius: convertDistanceToUnits(radius, TYPES.METERS),
        openNow: openNow,
        fields: ["name", "formatted_address", "type", "price_level", "rating", "review"],
        type: "restaurant"
        // rankBy: "DISTANCE"
      };
      placesSearchLoading();
      await this.service.textSearch(request, (results, status) => {
        //SEND DATA TO REDUX STORE.
        if (status !== "OK") {
          //ALSO DEAL WITH - ZERO RESULTS ERROR!!
          // return status;
          console.log("Failed", uid);
          placesSearchComplete({}, uid);
          return callback(status);
        }

        // return results;
        placesSearchComplete(results, uid);
        return callback({ results, uid });
      });
    };

    decideWinningPlace = placesData => {
      const { winner, history } = this.props;
      //1. Ensure Data exists

      //A. Filter for onces which have data
      const returnedData = Object.keys(placesData)
        .map(key => ({ ...placesData[key], uid: key }))
        .filter(data => Object.keys(data).length > 1);

      if (returnedData) {
        //B.Find out if winner still has data
        console.log(returnedData);
        console.log(winner);
        let currWinner = returnedData.find(data => data.uid === winner);

        //C. If not choose new winner
        if (!currWinner) {
          currWinner = returnedData[Math.floor(Math.random() * returnedData.length)];
          this.props.selectWinner(currWinner.uid);
        }

        //ADD LOGIC TO SELECT WINNING LOCATION (TODO)
        this.props.selectPlace(currWinner[0]);
        history.push(ROUTES.RESULTS);
      } else {
        //SEND TO NOT FOUND PAGE
      }
      //2. if no data returned send to new page and tell them to search again
      //3. initaite search for image of chosen place (TODO)
      //4. deleteSearchData
      //5. reRoute to new page
    };

    render() {
      const { places, userFormData } = this.props;
      if (Object.keys(places.data).length === Object.keys(userFormData).length) this.decideWinningPlace(places.data);

      return <Component {...this.props} initiateAPISearch={this.initiateAPISearch} />;
    }
  }

  return compose(
    withRedux,
    withRouter
  )(WithSearch);
};

export default withSearch;
