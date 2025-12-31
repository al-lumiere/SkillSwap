import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalUI } from './modal-ui';

const meta: Meta<typeof ModalUI> = {
  title: 'UI/ModalUI',
  component: ModalUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ModalUI>;

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && (
        <ModalUI onClose={() => setIsOpen(false)}>
          <div style={{ padding: '24px' }}>{children}</div>
        </ModalUI>
      )}
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWrapper>
      <h2>Modal Title</h2>
      <p>This is the modal content passed through children prop.</p>
    </ModalWrapper>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalWrapper>
      <h2>Login Form</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </ModalWrapper>
  ),
};
