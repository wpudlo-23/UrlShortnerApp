import React from 'react';
import { render, screen } from '@testing-library/react';
import Urls from '../components/Urls';
import { Url } from '../models/url.model';

var url = {
  "url_And_Slug": "https://localhost:3000/fr43i1", "url": "https://bearswire.usatoday.com/", "date": "04/12/2022"
};

describe("Urls component - unit tests", () => { 
  test('should render alert element', async () => {
    render(
        <Urls key={1} urls={ url } />
    );
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });

  test('should render entered url', async () => {
    render(
        <Urls key={1} urls={ url } />
    );
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent("https://bearswire.usatoday.com/");
  });
  
  test('should render shortened url in the header', async () => {
    render(
        <Urls key={1} urls={ url } />
    );
    const h5Element = screen.getByRole("heading", { level: 5 }) as HTMLBaseElement;
    expect(h5Element).toHaveTextContent("https://localhost:3000/fr43i1");
  });
})