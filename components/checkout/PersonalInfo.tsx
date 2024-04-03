import {useYupValidationResolver} from '@/hooks/useYupValidationResolver';
import {useUser} from '@clerk/nextjs';
import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {FaRegEdit} from 'react-icons/fa';
import * as yup from 'yup';

import {nameValidationRegex, phoneValidationRegex} from '@/lib/validators';

import {useCartStore} from '@/stores/cart';

import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {StepperComponentProps} from './utils';

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(nameValidationRegex, 'First Name must have a valid format')
    .required('First Name is required')
    .max(30, 'First Name must be at most 30 characters'),
  lastName: yup
    .string()
    .matches(nameValidationRegex, 'Last Name must have a valid format')
    .required('Last Name is required')
    .max(50, 'Last Name must be at most 50 characters'),
  phone: yup
    .string()
    .matches(phoneValidationRegex, 'Phone number must have valid format ')
    .required('Phone is required'),
});

export default function PersonalInfo({title, currentStep, step, onChangeStep}: StepperComponentProps) {
  const {user, isLoaded} = useUser();

  const userPhone = user?.phoneNumbers[0]?.phoneNumber || undefined;

  const {setPersonalInfo, personalInfo} = useCartStore((state) => state);

  const resolver = useYupValidationResolver(schema);

  const {register, handleSubmit, setValue, formState} = useForm<FormValues>({
    mode: 'onChange',
    resolver,
  });
  const {errors, isValid, isDirty} = formState;

  // Initialize values due to ssr and user will be fetched with delay
  useEffect(() => {
    if (user) {
      user?.firstName &&
        setValue('firstName', user.firstName, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      user?.lastName &&
        setValue('lastName', user.lastName, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      userPhone &&
        setValue('phone', userPhone, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
    }
  }, [user]);

  const onSubmit = (data: FormValues) => {
    setPersonalInfo(data);
    onChangeStep(step + 1);
  };

  const handleChangeStep = () => {
    onChangeStep(step);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-64 flex-col gap-4 pt-7">
        <Input
          label="First Name"
          isValid={!errors?.firstName}
          errorMessage={errors?.firstName?.message}
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          isValid={!errors?.lastName}
          errorMessage={errors?.lastName?.message}
          {...register('lastName')}
        />

        <Input label="Phone" isValid={!errors?.phone} errorMessage={errors?.phone?.message} {...register('phone')} />

        <Button
          disabled={!isValid || !isDirty}
          type="submit"
          className="mt-4 h-9 w-28"
          variant={!isValid || !isDirty ? 'disabled' : 'default'}
        >
          Next
        </Button>
      </form>
    );
  };

  const renderFilledContent = useCallback(() => {
    return currentStep > step ? (
      <div className="pt-1 text-sm text-darkGrey">
        <span>{personalInfo.firstName}, </span>
        <span>{personalInfo.phone}</span>
      </div>
    ) : (
      renderForm()
    );
  }, [currentStep, step, formState]);

  // Loading component
  const renderLoading = () => {
    if (!isLoaded) {
      return (
        <div className="flex w-80 flex-col gap-4 pt-7">
          <div className="h-10 animate-pulse rounded-md bg-muted"></div>
          <div className="h-10 animate-pulse rounded-md bg-muted"></div>
          <div className="h-10 animate-pulse rounded-md bg-muted"></div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="relative flex w-full">
        <h5 className="w-56 font-sans text-lg">{title}</h5>

        {isLoaded && currentStep > step && (
          <div
            onClick={handleChangeStep}
            className="flex items-center gap-2 pt-1 text-sm text-primary hover:cursor-pointer hover:text-primary-hover md:ml-20"
          >
            Edit <FaRegEdit />
          </div>
        )}
      </div>
      {!isLoaded ? renderLoading() : renderFilledContent()}
    </>
  );
}
