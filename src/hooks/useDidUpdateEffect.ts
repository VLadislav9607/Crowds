import { useEffect, useRef } from 'react';

export const useDidUpdateEffect = (
  effect: () => void | (() => void),
  deps: React.DependencyList,
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, deps);
};

