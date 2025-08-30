// @ts-ignore
import countries from "world-countries";

interface Country {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
}

const formattedCountries: Country[] = countries.map((country: any) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    formattedCountries.find((country: Country) => country.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
