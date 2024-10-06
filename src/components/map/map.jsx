import "./map.scss";
import { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export default function ElementMap() {
  const [marker2, setMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMapClick = (e) => {
    console.log(e.detail.latLng.lat, e.detail.latLng.lng);
    setMarker({
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    });
  };

  return (<div>
    <Map
      style={{ width: `${430}px`, height: `${855}px` }}
      defaultCenter={{ lat: -24.029286, lng: -52.3370791 }}
      streetView={true}
      defaultZoom={17}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapTypeId={"hybrid"}
      onClick={handleMapClick}
      mapId={"f1b7b3b3b1b3b1b3"}
      draggingCursor={"move"}
      draggableCursor={"pointer"}
    >
      {marker2 && (
        <AdvancedMarker position={{ lat: marker2.lat, lng: marker2.lng }}>
          <Pin
            background={"#0f9d58"}
            borderColor={"#006425"}
            glyphColor={"#60d98f"}
          />
        </AdvancedMarker>
      )}
      <AdvancedMarker ref={markerRef} position={null} />
    </Map>
    <MapControl position={ControlPosition.TOP}>
      <div className="autocomplete-control">
        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      </div>
    </MapControl>
    <MapHandler place={selectedPlace} marker={marker} />
  </div>);
}


const MapHandler = ({ place, marker }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }

    marker.position = place.geometry?.location;
  }, [map, place, marker]);
  return null;
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);
  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);
  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
};