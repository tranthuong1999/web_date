import { Suspense } from 'react';
import type { ReactElement } from 'react';

const withSuspense = (Component: ReactElement, fallback: ReactElement | null = null) => (
  <Suspense fallback={fallback}>{Component}</Suspense>
);

export { withSuspense };
