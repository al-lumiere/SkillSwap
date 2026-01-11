import { FC, useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useEscape } from '../../hooks/useEscape';
import styles from './popover.module.css';
import { PopoverUIProps } from './type';

export const PopoverUI: FC<PopoverUIProps> = ({
  isOpen,
  onClose,
  anchor,
  children,
  placement = 'bottom-start',
  maxWidth = null,
  offset = 8,
  matchWidth = false,
  popoverClassName,
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
    width: matchWidth ? '100%' : undefined,
  };

  return (
    <div ref={rootRef} className={[styles.root, matchWidth && styles.rootFullWidth].filter(Boolean).join(' ')}>
      <div className={[styles.anchor, matchWidth && styles.anchorFullWidth].filter(Boolean).join(' ')}>{anchor}</div>

      {isOpen && (
        <div
          className={[styles.popover, popoverClassName].filter(Boolean).join(' ')}
          data-placement={placement}
          style={style}
          role="dialog"
          aria-modal="false"
        >
          {children}
        </div>
      )}
    </div>
  );
};
