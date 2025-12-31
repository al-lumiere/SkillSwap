import { RefObject, useEffect } from 'react';

type UseOutsideClickParams = {
  enabled: boolean;
  refs: Array<RefObject<HTMLElement | null>>;
  onOutside: () => void;
};

export const useOutsideClick = ({ enabled, refs, onOutside }: UseOutsideClickParams): void => {
  useEffect(() => {
    if (!enabled) {
      return () => {};
    }

    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) {
        return;
      }

      const isInside = refs.some((ref) => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });

      if (!isInside) {
        onOutside();
      }
    };

    document.addEventListener('mousedown', handler, true);

    return () => {
      document.removeEventListener('mousedown', handler, true);
    };
  }, [enabled, refs, onOutside]);
};
