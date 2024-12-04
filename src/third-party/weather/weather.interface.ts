export interface WeatherDataProvider {
  getCurrentWeatherData(latitude: number, longitude: number);
}
