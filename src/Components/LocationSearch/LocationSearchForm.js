import React, { Component } from "react";
import AlgoliaPlaces from "algolia-places-react";
import * as CONFIG from "../../config";
import { withRedux } from "../../Redux";

export class LocationSearchForm extends Component {
  render() {
    const { formCompletionError, selectLocation, clearLocation } = this.props;
    return (
      <div style={{ paddingBottom: "20px" }}>
        <AlgoliaPlaces
          placeholder="Write an address here"
          options={{
            appId: CONFIG.ALGOLIA_SEARCH_APP_ID,
            apiKey: CONFIG.ALGOLIA_PLACES_API_KEY,
            countries: ["gb"],
            language: "en",
            type: "address"
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
        {formCompletionError && <div style={{ color: "red" }}>Please select a location to focus your location on </div>}
      </div>
    );
  }
}

export default withRedux(LocationSearchForm);
