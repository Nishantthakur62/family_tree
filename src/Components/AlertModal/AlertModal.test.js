import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AlertModal from './AlertModal';

describe('AlertModal', () => {
  it('renders the title, message, and calls confirm when approved', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(
      <AlertModal
        isOpen
        title="Delete family"
        message="This will remove the family tree from this browser."
        confirmText="Delete"
        cancelText="Keep it"
        onConfirm={onConfirm}
        onClose={onClose}
        danger
      />
    );

    expect(screen.getByText('Delete family')).toBeInTheDocument();
    expect(screen.getByText('This will remove the family tree from this browser.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
