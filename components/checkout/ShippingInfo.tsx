import {useYupValidationResolver} from '@/hooks/useYupValidationResolver';
import {Popover, PopoverTrigger} from '@radix-ui/react-popover';
import {useJsApiLoader} from '@react-google-maps/api';
import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {FaRegEdit} from 'react-icons/fa';
import {FaCalendarPlus} from 'react-icons/fa';
import * as yup from 'yup';

import {cn} from '@/lib/utils';
import {nameValidationRegex, zipValidationRegex} from '@/lib/validators';

import {useCartStore} from '@/stores/cart';

import {Button} from '../ui/button';
import {Calendar} from '../ui/calendar';
import {Input} from '../ui/input';
import {PopoverContent} from '../ui/popover';
import AddressComponent from './AddressComponent';
import {StepperComponentProps} from './utils';

export interface FormValues {
  country: string;
  city: string;
  address: string;
  zip: string;
  date: Date;
}

const schema = yup.object().shape({
  country: yup
    .string()
    .matches(nameValidationRegex, 'Country must have a valid format')
    .required('Country is required'),
  city: yup.string().matches(nameValidationRegex, 'City must have a valid format').required('City is required'),
  zip: yup
    .string()
    .matches(zipValidationRegex, 'Postal code must have a valid format')
    .required('Postal code is required'),
  address: yup.string().required('Address is required'),
  date: yup.date().required('Shipping date is required'),
});

export default function ShippingInfo(props: StepperComponentProps) {
  const {title, currentStep, step, onChangeStep} = props;
  const {shippingInfo, setShippingInfo} = useCartStore((state) => state);

  const resolver = useYupValidationResolver(schema);

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver,
    defaultValues: {
      date: new Date(),
    },
  });

  const {register, handleSubmit, watch, setValue: setValueForm, formState} = form;
  const {errors, isValid, isDirty} = formState;

  const handleChangeStep = () => {
    onChangeStep(step);
  };

  const onSubmit = (data: FormValues) => {
    setShippingInfo(data);
    onChangeStep(step + 1);
  };

  const [date, setDate] = React.useState<Date>(new Date());

  const {isLoaded} = useJsApiLoader({
    libraries: ['places'],
    language: 'en',
    preventGoogleFontsLoading: true,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API || '',
  });

  const renderForm = () => {
    return (
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-64 flex-col gap-4 pt-7">
          <div className="flex w-full flex-col justify-between gap-4">
            {isLoaded ? (
              <AddressComponent />
            ) : (
              <Input label="Street" errorMessage={errors?.address?.message} {...register('address')} />
            )}

            <div className="flex justify-between gap-4">
              <Input
                label="Country"
                isValid={!errors?.country}
                errorMessage={errors?.country?.message}
                {...register('country')}
              />

              <Input label="City" isValid={!errors?.city} errorMessage={errors?.city?.message} {...register('city')} />
            </div>

            <Input
              className="w-32"
              label="Zip Code"
              isValid={!errors?.zip}
              errorMessage={errors?.zip?.message}
              {...register('zip')}
            />
          </div>

          <h5 className="pt-2">Shipping date</h5>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-fit justify-start px-3 text-left font-normal',
                  !date && 'text-darkGrey',
                  !date && 'border-mediumGrey'
                )}
                onClick={() => setValueForm('date', new Date())}
              >
                <FaCalendarPlus className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onDayClick={setDate} initialFocus showOutsideDays={false} />
            </PopoverContent>
          </Popover>

          <Button
            disabled={!isValid || !isDirty}
            type="submit"
            className="mt-4 h-9 w-28"
            variant={!isValid || !isDirty ? 'disabled' : 'default'}
          >
            Next
          </Button>
        </form>
      </FormProvider>
    );
  };

  const renderFilledContent = useCallback(() => {
    return (
      <div className="pt-1 text-sm text-darkGrey">
        <span>{shippingInfo.address}, </span>
        <span>{shippingInfo.city}, </span>
        <span>{shippingInfo.country}</span>
        <div>
          <span>{format(shippingInfo.date, 'PPP')}</span>
        </div>
      </div>
    );
  }, [shippingInfo]);

  return (
    <>
      <div className="flex w-full">
        <h5 className="w-56 font-sans text-lg">{title}</h5>
        {currentStep > step && (
          <div
            onClick={handleChangeStep}
            className="flex items-center gap-2 pt-1 text-sm text-primary hover:cursor-pointer hover:text-primary-hover md:ml-20"
          >
            Edit <FaRegEdit />
          </div>
        )}
      </div>

      {currentStep > step ? renderFilledContent() : renderForm()}
    </>
  );
}
