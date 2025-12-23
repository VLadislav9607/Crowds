/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    UseQueryOptions,
    UseMutationOptions,
    UseInfiniteQueryOptions,
  } from '@tanstack/react-query';
  
  export interface IQueryOptions<
    Response,
    TError = Error,
    TData = Response,
  > extends Partial<UseQueryOptions<Response, TError, TData, unknown[]>> {}
  
  export interface IMutationOptions<
    Response,
    TError = any,
    TVariables = unknown,
  > extends Omit<UseMutationOptions<Response, TError, TVariables, unknown>, 'mutationFn'> {}

  export interface IInfinityQueryOptions<TData = any, TError = Error> extends Partial<
    UseInfiniteQueryOptions<any, TError, TData>
  > {}
  