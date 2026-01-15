import { FC } from 'react';
import { ProfileNavElementUI } from '@ui/profile-nav-element-ui';
import { ProfileNavUI } from '@ui/profile-nav-ui/profile-nav-ui';

import RequestIcon from '@icons/request-icon';
import MessageTextIcon from '@icons/message-text-icon';
import LikeIcon from '@icons/like-icon';
import IdeaIcon from '@icons/idea-icon';
import UserIcon from '@icons/user-icon';

export const ProfileNav: FC = () => {
  const items = [
    {
      id: 'requests',
      element: <ProfileNavElementUI text="Заявки" icon={<RequestIcon />} to="/profile/requests" />,
    },
    {
      id: 'exchanges',
      element: <ProfileNavElementUI text="Мои обмены" icon={<MessageTextIcon />} to="/profile/exchanges" />,
    },
    {
      id: 'favorites',
      element: <ProfileNavElementUI text="Избранное" icon={<LikeIcon />} to="/profile/favorites" />,
    },
    {
      id: 'skills',
      element: <ProfileNavElementUI text="Мои навыки" icon={<IdeaIcon />} to="/profile/skills" />,
    },
    {
      id: 'profile',
      element: <ProfileNavElementUI text="Личные данные" icon={<UserIcon />} to="/profile" end />,
    },
  ];

  return <ProfileNavUI items={items} />;
};
