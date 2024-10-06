import "./map.scss";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa";

export default function ElementMap() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newLocationName, setNewLocationName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    setMarkers(savedMarkers);
  }, []);

  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
  }, [markers]);

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
      name: "",
    };
    setSelectedMarker(newMarker);
  };

  const handleSaveMarker = () => {
    if (!newLocationName) return;

    const newMarker = {
      ...selectedMarker,
      name: newLocationName,
    };

    setMarkers([...markers, newMarker]);
    setSelectedMarker(null);
    setNewLocationName("");
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowModal(true);
  };

  return (
    <div className="map-container">
      <button onClick={handleSaveMarker} className="addButton">
        <FaPlus />
      </button>

      <Map
        style={{ width: `100%`, height: `-webkit-fill-available` }}
        defaultCenter={{ lat: -24.029286, lng: -52.3370791 }}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapTypeId={"hybrid"}
        onClick={handleMapClick}
        mapId={"f1b7b3b3b1b3b1b3"}
        draggingCursor={"move"}
        draggableCursor={"pointer"}
      >
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          >
            <Pin
              background={"#9d0f0f"}
              borderColor={"#640000"}
              glyphColor={"#d96060"}
            >
              <div className="markerInfos">
                <h5>{marker.name || "Posição customizada"}</h5>
                <div className="divider"></div>
                <div>
                  <p>Latitude: {parseFloat(marker.lat).toFixed(6)}</p>
                  <p>Longitude: {parseFloat(marker.lng).toFixed(6)}</p>
                </div>
              </div>
            </Pin>
          </AdvancedMarker>
        ))}

        {selectedMarker && (
          <AdvancedMarker
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          >
            <Pin
              background={"#9d0f0f"}
              borderColor={"#640000"}
              glyphColor={"#d96060"}
            >
              <div className="markerInfos">
                <h5>Posição customizada</h5>
                <div className="divider"></div>
                <div>
                  <p>
                    <b>Latitude:</b> {parseFloat(selectedMarker.lat).toFixed(6)}
                  </p>
                  <p>
                    <b>Longitude:</b>{" "}
                    {parseFloat(selectedMarker.lng).toFixed(6)}
                  </p>
                </div>
              </div>
            </Pin>
          </AdvancedMarker>
        )}
      </Map>

      {showModal && selectedMarker && (
        <div className="modal">
          <h2>{selectedMarker.name}</h2>
          <p>Latitude: {selectedMarker.lat}</p>
          <p>Longitude: {selectedMarker.lng}</p>
          <button onClick={() => setShowModal(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
