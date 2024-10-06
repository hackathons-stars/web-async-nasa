import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

const Home = () => {
  const [marker, setMarker] = useState(null);

  const handleMapClick = (e) => {
    console.log(e.detail.latLng.lat, e.detail.latLng.lng);
    setMarker({
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    });
  };

  return (
    <Map
      style={{ width: `${192 * 6}px`, height: `${108 * 6}px` }}
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
      {marker && (
        <AdvancedMarker position={{ lat: marker.lat, lng: marker.lng }}>
          <Pin
            background={"#0f9d58"}
            borderColor={"#006425"}
            glyphColor={"#60d98f"}
          />
        </AdvancedMarker>
      )}
    </Map>
  );
};

export default Home;