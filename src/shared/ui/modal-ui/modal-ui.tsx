import { FC, memo } from 'react';
import styles from './modal-ui.module.css';
import { ModalOverlayUI } from '../modal-overlay-ui';
import { ModalUIProps } from './type';

export const ModalUI: FC<ModalUIProps> = memo(({ onClose, children }) => (
  <>
    <div className={styles.modal}>{children}</div>
    <ModalOverlayUI onClick={onClose} />
  </>
));
