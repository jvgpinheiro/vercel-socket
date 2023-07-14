export type GenericObject = { [key: string]: any };
export type Merge<T extends GenericObject, U extends GenericObject> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};
export type Expand<T> = T extends GenericObject
  ? { [K in keyof T]: T[K] }
  : never;
export type GetArrayType<T extends Array<any>> = T extends Array<infer O>
  ? O
  : never;
export type Override<
  T extends GenericObject,
  U extends { [K in keyof T]?: any }
> = Pick<T, Exclude<keyof T, keyof U>> & U;
export type GetFirstParamFromFunction<F extends (data: any) => any> =
  F extends (data: infer O) => void ? O : never;
export type CancelablePromise<T> = {
  promise: Promise<T>;
  cancel: () => void;
};
