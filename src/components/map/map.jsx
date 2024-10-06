/* eslint-disable react/prop-types */
import "./map.scss";
import {
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState, useEffect, useRef } from "react";

import { FaPlus } from "react-icons/fa";
import MarkerInfoModal from "../marker-info-modal/marker-info-modal";
import { MdDelete } from "react-icons/md";

export default function ElementMap(props) {
  const { onSaveDefaultLoc , updateMarkers} = props;

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

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

  const handleDeleteMarker = () => {
    if (!selectedMarker) return;

    const newMarkers = markers.filter(
      (marker) =>
        marker.lat !== selectedMarker.lat && marker.lng !== selectedMarker.lng
    );

    setMarkers(newMarkers);
    setSelectedMarker(null);
    setOpenInfoModal(false);
  };

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    };

    setSelectedMarker(newMarker);
  };

  const handleSaveMarker = () => {
    if (!selectedMarker) return;
    if (!newLocationName) return;

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
        style={{ width: `100%`, height: `calc(100vh - 80px)` }}
        defaultCenter={{ lat: -24.029286, lng: -52.3370791 }}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapTypeId={"hybrid"}
        onClick={handleMapClick}
        mapId={"f1b7b3b3b1b3b1b3"}
        draggingCursor={"move"}
        draggableCursor={"pointer"}
        onBoundsChanged={(infos) => {
          setMapZoom(infos.detail.zoom);
        }}
      >
        <AdvancedMarker ref={markerRef} position={null} />

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
              {mapZoom > 15 && (
                <div className="markerName">
                  <p>{marker.name || "Posição customizada"}</p>
                </div>
              )}
            </Pin>
          </AdvancedMarker>
        ))}

        {selectedMarker && (
          <AdvancedMarker
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onClick={() => setSelectedMarker(null)}
          >
            <Pin
              background={"#9d0f0f"}
              borderColor={"#640000"}
              glyphColor={"#d96060"}
            >
              {!openInfoModal && (
                <div className="markerInfos">
                  <h5>Posição customizada</h5>
                  <div className="divider"></div>
                  <div>
                    <p>
                      <b>Latitude:</b>{" "}
                      {parseFloat(selectedMarker.lat).toFixed(6)}
                    </p>
                    <p>
                      <b>Longitude:</b>{" "}
                      {parseFloat(selectedMarker.lng).toFixed(6)}
                    </p>
                  </div>
                </div>
              )}
            </Pin>
          </AdvancedMarker>
        )}
      </Map>

      <MapControl position={ControlPosition.TOP}>
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
      </MapControl>
      <MapHandler place={selectedPlace} marker={marker} />

      <MarkerInfoModal
        isMobile={true}
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        position="bottom"
      >
        {openCreateModal && (
          <div className="">
            <h4>Adicionar novo local</h4>
            <div>
              <p>
                <b>Latitude:</b> {parseFloat(selectedMarker.lat).toFixed(6)}
              </p>
              <p>
                <b>Longitude:</b> {parseFloat(selectedMarker.lng).toFixed(6)}
              </p>
            </div>
            <div className="divider"></div>
            <input
              type="text"
              placeholder="Nome do local"
              value={newLocationName}
              onChange={(e) => {
                setNewLocationName(e.target.value);
              }}
              className="newLocationName"
            />
            <button onClick={handleSaveMarker} className="saveCreationButton">
              Salvar
            </button>
          </div>
        )}
      </MarkerInfoModal>
      <MarkerInfoModal
        isMobile={true}
        open={openInfoModal}
        onClose={() => {
          setOpenInfoModal(false);
          setSelectedMarker(null);
        }}
        position="bottom"
      >
        {openInfoModal && (
          <div className="info-modal">
            <div className="info-modal-header">
              <h4>{selectedMarker.name}</h4>
              <button onClick={() => handleDeleteMarker()}>
                <MdDelete />
              </button>
            </div>
            <div>
              <p>
                <b>Latitude:</b> {parseFloat(selectedMarker.lat).toFixed(6)}
              </p>
              <p>
                <b>Longitude:</b> {parseFloat(selectedMarker.lng).toFixed(6)}
              </p>
            </div>
            <button>Salvar como principal</button>
            <div className="divider"></div>
          </div>
        )}
      </MarkerInfoModal>
    </div>
  );
}

const MapHandler = ({ place, marker }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
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
      <input ref={inputRef} className="searchLocationInput" />
    </div>
  );
};
