import React from "react";
import { convertDistanceToUnits } from "../../Helpers/ConvertUnits";
import * as TYPES from "../../Constants/types";
import { withRedux } from "../../Redux";

const withSearch = Component => {
  class WithSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [] };
      this.service = new window.google.maps.places.PlacesService(document.createElement("div"));
    }

    searchAPI = ({ query, location, radius, maxPrice, openNow }) => {
      const { placesSearchComplete, placesSearchLoading, placesSearchError } = this.props;

      const request = {
        query,
        location: location.data.latlng,
        minPriceLevel: 0,
        maxPriceLevel: maxPrice,
        radius: convertDistanceToUnits(radius, TYPES.METERS),
        openNow: openNow,
        fields: ["name", "formatted_address", "icon", "type", "price_level", "rating", "review"],
        type: "restaurant"
      };
      placesSearchLoading();
      setTimeout(async () => {
        await this.service.textSearch(request, (results, status) => {
          //SEND DATA TO REDUX STORE.
          if (status !== "OK") {
            //ALSO DEAL WITH - ZERO RESULTS ERROR!!
            return placesSearchError(status);
          }
          // console.log(results);
          // this.setState({ data: results });
          placesSearchComplete(results);
        });
      }, 300);
    };
    render() {
      console.log(this.state);
      return <Component {...this.props} searchAPI={this.searchAPI} />;
    }
  }

  return withRedux(WithSearch);
};

export default withSearch;
