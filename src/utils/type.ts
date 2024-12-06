type AggregatedWeatherData = {
  ip: string;
  location: {
    city: string;
    country: string;
  };
  weather: {
    temperature: number;
    humidity: number;
    description: string;
  };
};
