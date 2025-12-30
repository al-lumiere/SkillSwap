import { FC, memo } from 'react';
import { ButtonUI } from '@ui/button';
import styles from './modal-ui.module.css';
import { ModalOverlayUI } from '../modal-overlay-ui';
import { ModalUIProps } from './type';

export const ModalUI: FC<ModalUIProps> = memo(({ onClose, children }) => (
  <>
    <div className={styles.modal}>
      {children}
      <ButtonUI variant="primary" onClick={onClose} padding="12px 99px">
        Готово
      </ButtonUI>
    </div>
    <ModalOverlayUI onClick={onClose} />
  </>
));
