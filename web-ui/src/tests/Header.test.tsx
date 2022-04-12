import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';


describe("Header - Unit tests", () => { 
  test('should render same text passed into title prop', () => {
    render(<Header title='React App' />);
    const titleElement = screen.getByText(/React App/i);
    expect(titleElement).toBeInTheDocument();
  });
})