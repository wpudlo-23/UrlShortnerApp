import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateUrls from '../components/CreateUrl';

const mockedSetUrl = jest.fn();
const mockedCreateUrl = jest.fn();

describe("CreateUrl - Unit tests", () => {
    test('should render input element', async () => {
        render(
            <CreateUrls
                urls={[]}
                setUrl={mockedSetUrl}
                createUrl={mockedCreateUrl} />
        );
        const inputElement = screen.getByPlaceholderText(/Enter Url to shorten/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('should render submit button element', async () => {
        render(
            <CreateUrls
                urls={[]}
                setUrl={mockedSetUrl}
                createUrl={mockedCreateUrl} />
        );
        const buttonElement = screen.getByRole("button", { name: /Submit/i });
        expect(buttonElement).toBeInTheDocument();
      });
    
    test('should be able to type url into text field', async () => {
        render(
            <CreateUrls
                urls={[]}
                setUrl={mockedSetUrl}
                createUrl={mockedCreateUrl} />
        );
        const inputElement = screen.getByPlaceholderText(/Enter Url to shorten/i) as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: "https://bearswire.usatoday.com/" } });
        expect(inputElement.value).toBe("https://bearswire.usatoday.com/");
    });
})

