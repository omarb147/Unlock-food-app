import React, { Component } from "react";
import AlgoliaPlaces from "algolia-places-react";
import * as CONFIG from "../../config";
import { withRedux } from "../../Redux";
import "./locationSearch.css";

export class LocationSearchForm extends Component {
  render() {
    const { selectLocation, clearLocation } = this.props;
    return (
      <div style={{ paddingBottom: "20px", position: "relative", zIndex: 1000 }}>
        <AlgoliaPlaces
          placeholder="Write an address here"
          options={{
            appId: CONFIG.ALGOLIA_SEARCH_APP_ID,
            apiKey: CONFIG.ALGOLIA_PLACES_API_KEY,
            countries: ["gb"],
            language: "en",
            type: "address",
            style: true
            // Other options from https://community.algolia.com/places/documentation.html#options
          }}
          onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
            // "Fired when suggestion selected in the dropdown or hint was validated."
            selectLocation(suggestion);
          }}
          onSuggestions={({ rawAnswer, query, suggestions }) => {
            // console.log("Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.")
          }}
          onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => {
            // console.log("Fired when arrows keys are used to navigate suggestions.")
          }}
          onClear={() => {
            clearLocation();
            // console.log("Fired when the input is cleared.")
          }}
          onLimit={({ message }) => {
            // console.log("Fired when you reached your current rate limit.")
          }}
          onError={({ message }) => {
            // console.log("Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.")
          }}
        />
      </div>
    );
  }
}

export default withRedux(LocationSearchForm);
