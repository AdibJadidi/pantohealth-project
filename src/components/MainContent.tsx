import { useEffect, useMemo, useState } from "react";
import type { Station } from "../types/station";
import { CityFilter } from "./CityFilter";
import MapView from "./MapView";
import StationList from "./StationList";
import { Skeleton } from "./ui/skeleton";

const API_URL =
  "https://corsproxy.io/?https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw";
const MainContent = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [error, setError] = useState("");
  const [selectedStation, setSelectedStation] = useState<Station | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const handleStationSelect = (station: Station | undefined) => {
    if (!station) return;
    if (selectedStation?.id === station.id) setSelectedStation(undefined);
    else setSelectedStation(station);
  };
  const cities = useMemo(
    () => Array.from(new Set(stations.map((s) => s.city))),
    [stations]
  );
  const filteredStations = useMemo(
    () =>
      selectedCity === ""
        ? stations
        : stations.filter((s) => s.city === selectedCity),
    [stations, selectedCity]
  );

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStations(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStation();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <Skeleton className="h-[500px] w-full" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!stations) return <div>No stations found</div>;
  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          <MapView
            selectedStation={selectedStation}
            stations={filteredStations}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <CityFilter
            cities={cities}
            value={selectedCity}
            onChange={setSelectedCity}
          />
          <StationList
            stations={filteredStations}
            selectedStation={selectedStation}
            onSelect={handleStationSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
