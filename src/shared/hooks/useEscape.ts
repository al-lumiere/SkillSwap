import { useEffect } from 'react';

type UseEscapeParams = {
  enabled: boolean;
  onEscape: () => void;
};

export const useEscape = ({ enabled, onEscape }: UseEscapeParams): void => {
  useEffect(() => {
    if (!enabled) {
      return () => {};
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [enabled, onEscape]);
};
