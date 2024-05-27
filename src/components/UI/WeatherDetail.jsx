export default function WeatherDetail({
  tag: Tag = "p",
  label,
  value,
  needsTemperatureUnit = false,
  needsSpeedUnit = false,
  needsPercentage = false,
  ...props
}) {
  return (
    <Tag {...props}>
      <span className="font-bold">{label}:</span> {value}{" "}
      {needsTemperatureUnit && "°C"} {needsSpeedUnit && "km/h"}{" "}
      {needsPercentage && "%"}
    </Tag>
  );
}
