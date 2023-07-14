import { CancelablePromise } from "./TypeUtils";

export function cancelablePromise<T>(
  promise: Promise<T>
): CancelablePromise<T> {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve: (value: T) => void, reject) => {
    promise.then(
      (val) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}
