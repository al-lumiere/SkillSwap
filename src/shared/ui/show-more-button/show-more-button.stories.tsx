import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { ShowMoreButtonUI } from './show-more-button';

const meta: Meta<typeof ShowMoreButtonUI> = {
  title: 'ui/ShowMoreButtonUI',
  component: ShowMoreButtonUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    open: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof ShowMoreButtonUI>;

const InteractiveTemplate = ({ label, open: initialOpen }: Parameters<typeof ShowMoreButtonUI>[0]) => {
  const [open, setOpen] = useState(initialOpen || false);

  useEffect(() => {
    setOpen(initialOpen || false);
  }, [initialOpen]);

  const handleClick = () => {
    setOpen(!open);
  };

  return <ShowMoreButtonUI label={label} open={open} onClick={handleClick} />;
};

export const Closed: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Все города',
    open: false,
    onClick: () => {},
  },
};

export const Open: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Все города',
    open: true,
    onClick: () => {},
  },
};
