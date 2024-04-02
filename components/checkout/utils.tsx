export interface StepperComponentProps {
  title: string;
  currentStep: number;
  step: number;
  onChangeStep: (step: number) => void;
}

export const getDataFromGooglePlace = (
  item: google.maps.places.AutocompletePrediction,
  addressComponent: google.maps.places.PlaceResult['address_components']
) => {
  const countryName =
    addressComponent?.find((cmp) => cmp.types.includes('country') && cmp.types.includes('political'))?.long_name || '';

  const city =
    addressComponent?.find((cmp) => cmp.types.includes('political') && cmp.types.includes('locality'))?.long_name || '';

  const zip = addressComponent?.find((cmp) => cmp.types.includes('postal_code'))?.long_name || '';

  const address = item.structured_formatting.main_text;

  return {
    countryName,
    city,
    zip,
    address,
  };
};
