import React from 'react';
import { render, screen } from '@testing-library/react';
import UrlsList from '../components/UrlsList';

const mockedSetUrl = jest.fn();
const mockedeleteAll = jest.fn();

describe("UrlsList - Unit tests", () => { 
  test('should render submit button element', async () => {
    render(
        <UrlsList
            urls={[]}
            setUrl={mockedSetUrl}
            deleteAll={mockedeleteAll} />
    );
    const buttonElement = screen.getByRole("button", { name: /Clear Urls/i });
    expect(buttonElement).toBeInTheDocument();
  });
})