import { retry, handleAll, ExponentialBackoff } from 'cockatiel';

export const EmailRetryPolicy = retry(handleAll, {
  maxAttempts: 3,
  backoff: new ExponentialBackoff({
    initialDelay: 500,
    maxDelay: 5000,
  }),
});
