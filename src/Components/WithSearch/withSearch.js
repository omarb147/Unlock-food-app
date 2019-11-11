import React from "react";
import { compose } from "recompose";
import { placesTextSearchAPI, decideWinningLocation } from "../../services";
import { withRouter } from "react-router-dom";
import { convertDistanceToUnits } from "../../Helpers/ConvertUnits";
import * as TYPES from "../../Constants/types";
import { withRedux } from "../../Redux";
import async from "async";
import * as ROUTES from "../../Constants/routes";

const mainSearchQuery = {
  query: "",
  location: {},
  maxPriceLevel: 5,
  radius: 100,
  openNow: true,
  fields: ["name", "formatted_address", "type", "price_level", "rating", "review"],
  type: "restaurant"
};

const withSearch = Component => {
  class WithSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [] };
      this.service = new window.google.maps.places.PlacesService(document.createElement("div"));
    }

    initiatePlacesSearch = async searchQuery => {
      const { placesSearchComplete, placesSearchLoading, placesSearchError } = this.props;

      searchQuery.forEach(data => {
        const { query, latlng, radius, maxPrice, openNow, uid } = data;
        //Compose Request string using the mainSearchQuery as a base
        const request = {
          ...mainSearchQuery,
          query,
          location: latlng,
          maxPriceLevel: maxPrice,
          radius: convertDistanceToUnits(radius, TYPES.METERS),
          openNow: openNow
        };
        placesTextSearchAPI(this.service, request, (data, status) => {
          // Callback to deal with results
          if (status === "OK") {
            placesSearchComplete({ data: [...data], status }, uid);
          } else {
            placesSearchComplete({ data: [], status }, uid);
          }
        });
      });
    };

    selectWinningLocation = data => {
      const { winner, history, selectWinner } = this.props;
      console.log(winner.uid);
      decideWinningLocation(data, winner.uid, (location, updatedWinner, error) => {
        if (!error) {
          selectWinner(updatedWinner, location);
          history.push(ROUTES.RESULTS);
        }
      });
    };

    render() {
      const { places, userFormData, winner } = this.props;
      if (Object.keys(places.data).length === Object.keys(userFormData).length) this.selectWinningLocation(places.data);
      console.log(winner);

      return <Component {...this.props} initiateAPISearch={this.initiatePlacesSearch} />;
    }
  }

  return compose(
    withRedux,
    withRouter
  )(WithSearch);
};

export default withSearch;
