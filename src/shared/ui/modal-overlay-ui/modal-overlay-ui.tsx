import styles from './modal-overlay-ui.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div
    className={styles.overlay}
    onClick={onClick}
    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        onClick();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label="Close modal"
  />
);
