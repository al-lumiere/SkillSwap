import { FC, useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useEscape } from '../../hooks/useEscape';
import styles from './popover.module.css';

type Placement = 'bottom-start' | 'bottom-end';

export type PopoverUIProps = {
  isOpen: boolean;
  onClose: () => void;
  anchor: React.ReactNode;
  children: React.ReactNode;
  placement: Placement;
  maxWidth: number | null;
  offset: number;
};

export const PopoverUI: FC<PopoverUIProps> = ({
  isOpen,
  onClose,
  anchor,
  children,
  placement = 'bottom-start',
  maxWidth = null,
  offset = 8,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    enabled: isOpen,
    refs: [rootRef],
    onOutside: onClose,
  });

  useEscape({
    enabled: isOpen,
    onEscape: onClose,
  });

  const style: React.CSSProperties & {
    ['--popover-offset']?: string;
  } = {
    '--popover-offset': `${offset}px`,
    maxWidth: maxWidth !== null ? `${maxWidth}px` : undefined,
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.anchor}>{anchor}</div>

      {isOpen && (
        <div className={styles.popover} data-placement={placement} style={style} role="dialog" aria-modal="false">
          {children}
        </div>
      )}
    </div>
  );
};
