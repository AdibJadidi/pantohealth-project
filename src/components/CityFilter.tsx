export const CityFilter = ({
  cities,
  onChange,
  value,
}: {
  cities: string[];
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};
