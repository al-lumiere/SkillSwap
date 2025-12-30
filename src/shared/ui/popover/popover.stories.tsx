import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PopoverUI } from './popover';

const meta: Meta<typeof PopoverUI> = {
  title: 'ui/PopoverUI',
  component: PopoverUI,
};

export default meta;

type Story = StoryObj<typeof PopoverUI>;

export const BottomStart: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <PopoverUI
        isOpen={open}
        onClose={() => setOpen(false)}
        placement="bottom-start"
        offset={8}
        maxWidth={320}
        anchor={
          <button type="button" onClick={() => setOpen((prev) => !prev)}>
            Open popover
          </button>
        }
      >
        <div>Popover content</div>
      </PopoverUI>
    );
  },
};

export const BottomEnd: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <PopoverUI
        isOpen={open}
        onClose={() => setOpen(false)}
        placement="bottom-end"
        offset={8}
        maxWidth={320}
        anchor={
          <button type="button" onClick={() => setOpen((prev) => !prev)}>
            Open popover
          </button>
        }
      >
        <div>Popover content</div>
      </PopoverUI>
    );
  },
};
