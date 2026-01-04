import type { Station } from "../types/station";

interface Props {
  stations: Station[];
  selectedStation?: Station;
  onSelect: (station: Station | undefined) => void;
}

export default function StationList({
  stations,
  selectedStation,
  onSelect,
}: Props) {
  return (
    <ul className="flex flex-col gap-2 max-h-[450px] overflow-y-auto">
      {stations.map((station) => (
        <li
          key={station.id}
          onClick={() => onSelect(station)}
          className={`p-2 rounded cursor-pointer transition-colors duration-200 ${
            selectedStation?.id === station.id
              ? "bg-blue-200"
              : "hover:bg-gray-200"
          }`}
        >
          <strong>{station.name}</strong>
          <br />
          <small>{station.city}</small>
        </li>
      ))}
    </ul>
  );
}
