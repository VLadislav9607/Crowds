import { InfiniteData, QueryFunctionContext } from '@tanstack/react-query';

export interface IPaginationMeta {
  offset: number;
  limit: number;
  total_count: number;
}

export interface IWithPaginationResponse<T> {
  data: T;
  meta: IPaginationMeta;
}

export const getInfiniteQueryNextPageParams = <
  T extends IWithPaginationResponse<any>,
>(
  lastPage: T,
): number | undefined => {
  const currentItemsCount = lastPage.meta.offset + lastPage.meta.limit;
  const hasNextPage = currentItemsCount < lastPage.meta.total_count;

  if (!hasNextPage) return undefined;

  // Розраховуємо номер поточної сторінки: pageParam = (offset / limit) + 1
  const currentPage =
    Math.floor(lastPage.meta.offset / lastPage.meta.limit) + 1;
  return currentPage + 1;
};

type ExtractData<T> = T extends IWithPaginationResponse<infer D> ? D : never;

// Допоміжний тип для визначення типу після flat(1)
type FlattenArray<T> = T extends (infer U)[] ? U[] : T[];

export const getQuerySelectData = <S extends IWithPaginationResponse<any>>(
  data: InfiniteData<S, unknown>,
): IWithPaginationResponse<FlattenArray<ExtractData<S>>> => {
  type DataType = ExtractData<S>;
  type FlattenedType = FlattenArray<DataType>;

  const flattenedData = data.pages.map(el => el.data).flat(1) as FlattenedType;

  const obj: IWithPaginationResponse<FlattenedType> = {
    data: flattenedData,
    meta: data.pages.find(el => el.meta !== undefined)?.meta ?? {
      offset: 0,
      limit: 0,
      total_count: 0,
    },
  };

  return obj;
};

export const createQuerySelectData = <
  TResponse extends IWithPaginationResponse<any>,
>() => {
  type DataType = ExtractData<TResponse>;
  type ResultDataType = FlattenArray<DataType>;

  return (
    data: InfiniteData<TResponse, unknown>,
  ): IWithPaginationResponse<ResultDataType> => {
    return getQuerySelectData<TResponse>(data);
  };
};

type ActionParams<T> = T extends (params?: infer P) => Promise<any>
  ? P extends undefined
    ? never
    : P
  : T extends (params: infer P) => Promise<any>
  ? P
  : never;

type ActionReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

export const getInfiniteQueryFn = <
  TAction extends (params?: any) => Promise<any>,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  action: TAction,
  params: ActionParams<TAction> extends never
    ? never
    : Omit<NonNullable<ActionParams<TAction>>, 'offset'> &
        Partial<Pick<NonNullable<ActionParams<TAction>>, 'limit'>>,
  defaultLimit: number = 20,
) => {
  type ParamsType = NonNullable<ActionParams<TAction>>;
  return async (
    context: QueryFunctionContext<TQueryKey, unknown>,
  ): Promise<ActionReturnType<TAction>> => {
    const pageParam = (context.pageParam ?? 1) as number;
    const limit = (params as ParamsType).limit || defaultLimit;
    // Розраховуємо offset: pageParam=1 -> offset=0, pageParam=2 -> offset=limit, тощо
    const offset = (pageParam - 1) * limit;
    return await action({
      ...params,
      limit,
      offset,
    } as ParamsType);
  };
};
