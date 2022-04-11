import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('should render same text passed into title prop', () => {
  render(<Header title='React App' />);
  const linkElement = screen.getByText(/React App/i);
  expect(linkElement).toBeInTheDocument();
});
