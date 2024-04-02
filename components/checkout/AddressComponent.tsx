'use client';

import React, {useCallback, useEffect} from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import {useFormContext} from 'react-hook-form';
import usePlacesAutocomplete, {getDetails} from 'use-places-autocomplete';

import {useCartStore} from '@/stores/cart';

import {Input} from '../ui/input';
import {getDataFromGooglePlace} from './utils';

export default function AddressComponent() {
  const {address} = useCartStore((state) => state.shippingInfo);

  const {
    formState: {errors},
    setValue: setValueForm,
  } = useFormContext();

  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['address'],
      language: 'en',
    },
    debounce: 500,
  });

  useEffect(() => {
    setValue(address, false);
  }, [address]);

  const ref = useOnclickOutside(() => clearSuggestions());

  const getCityDetails = useCallback(async (placeId: string) => {
    const parameter = {
      placeId,
      fields: ['place_id', 'address_components'],
    };

    return getDetails(parameter);
  }, []);

  const handleSelect = (item: google.maps.places.AutocompletePrediction) => async () => {
    const detail = (await getCityDetails(item.place_id)) as google.maps.places.PlaceResult;

    const {address, countryName, city, zip} = getDataFromGooglePlace(item, detail?.address_components);

    address &&
      setValueForm('address', address, {
        shouldValidate: true,
        shouldTouch: !!address,
        shouldDirty: !!address,
      });
    city &&
      setValueForm('city', city, {
        shouldValidate: true,
        shouldTouch: !!city,
        shouldDirty: !!city,
      });
    zip &&
      setValueForm('zip', zip, {
        shouldValidate: true,
        shouldTouch: !!zip,
        shouldDirty: !!zip,
      });
    countryName &&
      setValueForm('country', countryName, {
        shouldValidate: true,
        shouldTouch: !!countryName,
        shouldDirty: !!countryName,
      });

    // When the user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(address, false);
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: {main_text, secondary_text},
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)} className="hover:cursor-pointer hover:bg-mediumGrey">
          <strong>{main_text} </strong>
          <small>{secondary_text}</small>
        </li>
      );
    });

  const handleInput = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div ref={ref} className="relative">
      <>
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          disabledAndValid={!!value}
          label="Street"
          isValid={!errors?.address}
          errorMessage={errors?.address?.message as string}
        />
        {status === 'OK' && (
          <ul className="absolute top-10 z-20 min-h-32 w-full bg-white px-3 pt-2">{renderSuggestions()}</ul>
        )}
      </>
    </div>
  );
}
