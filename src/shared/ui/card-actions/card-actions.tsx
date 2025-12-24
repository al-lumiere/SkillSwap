// src/shared/ui/card-actions/card-actions.tsx

import React from 'react';
import styles from './card-actions.module.css';
import { CardActionsUIProps } from './types';
import { IconButtonUI } from '../icon-button/icon-button';
import LikeIcon from '../../assets/icons/like-icon';
import LikeFullIcon from '../../assets/icons/like-full-icon';
import MoreIcon from '../../assets/icons/more-icon';
import ShareIcon from '../../assets/icons/share-icon';

export const CardActionsUI: React.FC<CardActionsUIProps> = ({
  isLiked,
  onLikeClick,
  onMoreClick,
  onShareClick,
  className = '',
}) => (
  <div className={`${styles.container} ${className}`}>
    <IconButtonUI onClick={onLikeClick} isActive={isLiked}>
      {isLiked ? <LikeFullIcon /> : <LikeIcon />}
    </IconButtonUI>

    <IconButtonUI onClick={onShareClick}>
      <ShareIcon />
    </IconButtonUI>

    <IconButtonUI onClick={onMoreClick}>
      <MoreIcon />
    </IconButtonUI>
  </div>
);
