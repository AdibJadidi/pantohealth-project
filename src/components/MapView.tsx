import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import trainIcon from "../assets/train.png";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import type { Station } from "../types/station";

const GermanyPosition: LatLngExpression = [51.1657, 10.4515];

function FlyToStation({
  station,
  resetView,
}: {
  station?: Station;
  resetView?: boolean;
}) {
  const map = useMap();
  useEffect(() => {
    if (resetView) {
      map.flyTo(GermanyPosition, 7);
    }
    if (!station) return;
    map.flyTo([station?.lat, station?.lng], 15);

    return () => {
      map.flyTo(GermanyPosition, 7);
    };
  }, [station, map, resetView]);
  return null;
}

const MapView = ({
  stations,
  selectedStation,
}: {
  stations: Station[];
  selectedStation?: Station;
}) => {
  const position: LatLngExpression = GermanyPosition;

  const defaultIcon = new L.Icon({
    iconUrl: trainIcon,
    iconSize: [45, 41],
    iconAnchor: [12, 41],
    popupAnchor: [10, -34],
  });

  return (
    <div
      className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden"
      style={{ position: "relative" }}
    >
      <MapContainer
        center={position}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations.map((station: any) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={defaultIcon}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}

        {selectedStation ? (
          <FlyToStation station={selectedStation} />
        ) : (
          <FlyToStation resetView={true} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
