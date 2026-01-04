import { render, screen, fireEvent } from "@testing-library/react";
import StationList from "./StationList";
import type { Station } from "../types/station";
import "@testing-library/jest-dom";

describe("StationList component", () => {
  const mockStations: Station[] = [
    { id: 1, name: "Station A", city: "Berlin", lat: 52.52, lng: 13.405 },
    { id: 2, name: "Station B", city: "Munich", lat: 48.1351, lng: 11.582 },
  ];

  const onSelectMock = jest.fn();

  beforeEach(() => {
    onSelectMock.mockClear();
  });

  test("renders all stations", () => {
    render(
      <StationList
        stations={mockStations}
        selectedStation={undefined}
        onSelect={onSelectMock}
      />
    );

    expect(screen.getByText("Station A")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Station B")).toBeInTheDocument();
    expect(screen.getByText("Munich")).toBeInTheDocument();
  });

  test("highlights selected station", () => {
    render(
      <StationList
        stations={mockStations}
        selectedStation={mockStations[0]}
        onSelect={onSelectMock}
      />
    );

    const selectedLi = screen.getByText("Station A").closest("li");
    expect(selectedLi).toHaveClass("bg-blue-200");

    const notSelectedLi = screen.getByText("Station B").closest("li");
    expect(notSelectedLi).not.toHaveClass("bg-blue-200");
  });

  test("calls onSelect when a station is clicked", () => {
    render(
      <StationList
        stations={mockStations}
        selectedStation={undefined}
        onSelect={onSelectMock}
      />
    );

    const li = screen.getByText("Station B").closest("li");
    if (!li) throw new Error("List item not found");

    fireEvent.click(li);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(mockStations[1]);
  });
});
