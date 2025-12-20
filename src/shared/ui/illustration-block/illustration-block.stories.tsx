import type { Meta, StoryObj } from '@storybook/react-vite';
import { IllustrationBlockUI } from './illustration-block';
import UserInfoIllustration from '../../assets/images/user-info';
import Error404Illustration from '../../assets/images/error-404';
import Error500Illustration from '../../assets/images/error-500';
import LightBulbIllustration from '../../assets/images/light-bulb';
import SchoolBoardIllustration from '../../assets/images/school-board';

const meta: Meta<typeof IllustrationBlockUI> = {
  title: 'ui/IllustrationBlock',
  component: IllustrationBlockUI,
  args: {
    illustration: <UserInfoIllustration />,
    title: 'Расскажите немного о себе',
    description: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
    actions: null,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Текст заголовка',
    },
    description: {
      control: 'text',
      description: 'Текст описания',
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof IllustrationBlockUI>;

export const Error404: Story = {
  args: {
    illustration: <Error404Illustration />,
    title: 'Страница не найдена',
    description: 'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
    actions: [
      {
        primary: false,
        text: 'Сообщить об ошибке',
        onClick: () => {
          console.log('Сообщение об ошибке');
        },
      },
      {
        primary: true,
        text: 'На главную',
        onClick: () => {
          console.log('На главную');
        },
      },
    ],
  },
};

export const Error500: Story = {
  args: {
    illustration: <Error500Illustration />,
    title: 'На сервере произошла ошибка',
    description: 'Попробуйте позже или вернитесь на главную страницу',
    actions: [
      {
        primary: false,
        text: 'Сообщить об ошибке',
        onClick: () => {
          console.log('Сообщение об ошибке');
        },
      },
      {
        primary: true,
        text: 'На главную',
        onClick: () => {
          console.log('На главную');
        },
      },
    ],
  },
};

export const LightBulb: Story = {
  args: {
    illustration: <LightBulbIllustration />,
    title: 'С возвращением в SkillSwap!',
    description: 'Обменивайтесь знаниями и навыками с другими людьми',
  },
};

export const UserInfo: Story = {};

export const SchoolBoard: Story = {
  args: {
    illustration: <SchoolBoardIllustration />,
    title: 'Укажите, чем вы готовы поделиться',
    description: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
  },
};
