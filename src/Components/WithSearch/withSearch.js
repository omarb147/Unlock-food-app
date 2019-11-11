import React from "react";
import { compose } from "recompose";
import { placesTextSearchAPI, decideWinningLocation, placesIdSearchAPI } from "../../services";
import { withRouter } from "react-router-dom";
import { convertDistanceToUnits } from "../../Helpers/ConvertUnits";
import { withRedux } from "../../Redux";
import * as ROUTES from "../../Constants/routes";
import * as TYPES from "../../Constants/types";

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

    selectWinningLocation = async data => {
      const { winner, history, selectWinner, placesSearchClearData } = this.props;
      decideWinningLocation(data, winner.uid, async (location, updatedWinner, error) => {
        if (!error) {
          //initiate request for winner data i.e. images.

          placesSearchClearData();
          await placesIdSearchAPI(this.service, location.place_id, (results, status) => {
            selectWinner(updatedWinner, results);
            history.push(ROUTES.RESULTS, { winner: { uid: updatedWinner, location: location.id } });
          });
        } else {
          //Pop up error about being unable to find any results!
          //ALSO MAKE SURE THE actual errors are being propogated through so different messages can be shown!
        }
      });
    };

    render() {
      const { places, userFormData, winner } = this.props;
      if (Object.keys(places.data).length === Object.keys(userFormData).length) this.selectWinningLocation(places.data);

      return <Component {...this.props} initiateAPISearch={this.initiatePlacesSearch} placesIdSearchAPI={this.winningPlaceDetailsSearch} />;
    }
  }

  return compose(
    withRedux,
    withRouter
  )(WithSearch);
};

export default withSearch;
