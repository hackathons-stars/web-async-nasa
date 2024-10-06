import "./map.scss";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import MarkerInfoModal from "../marker-info-modal/marker-info-modal";
import {
  ControlPosition,
  MapControl,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export default function ElementMap() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapZoom, setMapZoom] = useState(17);

  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    setMarkers(savedMarkers);
  }, []);

  useEffect(() => {
    if (markers.length > 0) {
      localStorage.setItem("markers", JSON.stringify(markers));
    }
  }, [markers]);

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.detail.latLng.lat(),
      lng: e.detail.latLng.lng(),
    };
    setSelectedMarker(newMarker);
    setOpenCreateModal(true);
  };

  const handleSaveMarker = () => {
    const newMarker = {
      name: newLocationName,
      ...selectedMarker,
    };
    setMarkers([...markers, newMarker]);
    setSelectedMarker(null);
    setNewLocationName("");
    setOpenCreateModal(false);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setOpenInfoModal(true);
  };

  return (
    <div className="map-container">
      {selectedMarker && (
        <button onClick={() => setOpenCreateModal(true)} className="addButton">
          <FaPlus />
        </button>
      )}

      <Map
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
        defaultCenter={{ lat: -24.029286, lng: -52.3370791 }}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapTypeId={"hybrid"}
        onClick={handleMapClick}
        mapId={"f1b7b3b3b1b3b1b3"}
        onBoundsChanged={(infos) => setMapZoom(infos.detail.zoom)}
      >
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          >
            <Pin background={"#9d0f0f"} borderColor={"#640000"} glyphColor={"#d96060"}>
              {mapZoom > 15 && (
                <div className="markerName">
                  <p>{marker.name || "Posição customizada"}</p>
                </div>
              )}
            </Pin>
          </AdvancedMarker>
        ))}

        {selectedMarker && (
          <AdvancedMarker position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}>
            <Pin background={"#9d0f0f"} borderColor={"#640000"} glyphColor={"#d96060"}>
              {!openInfoModal && (
                <div className="markerInfos">
                  <h5>Posição customizada</h5>
                  <div className="divider"></div>
                  <p><b>Latitude:</b> {parseFloat(selectedMarker.lat).toFixed(6)}</p>
                  <p><b>Longitude:</b> {parseFloat(selectedMarker.lng).toFixed(6)}</p>
                </div>
              )}
            </Pin>
          </AdvancedMarker>
        )}
      </Map>

      {/* Create marker modal */}
      <MarkerInfoModal
        isMobile={true}
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        position="bottom"
      >
        {openCreateModal && (
          <div>
            <input
              type="text"
              placeholder="Nome do local"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
            />
            <div className="divider"></div>
            <p><b>Latitude:</b> {parseFloat(selectedMarker?.lat).toFixed(6)}</p>
            <p><b>Longitude:</b> {parseFloat(selectedMarker?.lng).toFixed(6)}</p>
            <div className="divider"></div>
            <button onClick={handleSaveMarker}>Salvar</button>
          </div>
        )}
      </MarkerInfoModal>

      {/* Info marker modal */}
      <MarkerInfoModal
        isMobile={true}
        open={openInfoModal}
        onClose={() => setOpenInfoModal(false)}
        position="bottom"
      >
        {openInfoModal && (
          <div>
            <h1>{selectedMarker?.name}</h1>
            <p><b>Latitude:</b> {parseFloat(selectedMarker?.lat).toFixed(6)}</p>
            <p><b>Longitude:</b> {parseFloat(selectedMarker?.lng).toFixed(6)}</p>
          </div>
        )}
      </MarkerInfoModal>

      {/* Autocomplete control */}
      <MapControl position={ControlPosition.TOP}>
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
      </MapControl>

      <MapHandler place={selectedPlace} />
    </div>
  );
}

// Autocomplete component
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
      <input ref={inputRef} placeholder="Pesquisar local..." />
    </div>
  );
};

// Map handler for selected place
const MapHandler = ({ place }) => {
  const map = useMap();
  const markerRef = useAdvancedMarkerRef();

  useEffect(() => {
    if (!map || !place || !markerRef.current) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    }

    markerRef.current.position = place.geometry?.location;
  }, [map, place, markerRef]);

  return null;
};
