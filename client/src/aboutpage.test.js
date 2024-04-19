import React from 'react';
import { render } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage Component', () => {
  it('renders without errors', () => {
    render(<AboutPage />);
  });

  it('displays the "Get your Merchandise" heading', () => {
    const { getByText } = render(<AboutPage />);
    const heading = getByText('Get your Merchandise');
    expect(heading).toBeInTheDocument();
  });

  it('displays the "Explore Now" button', () => {
    const { getByText } = render(<AboutPage />);
    const exploreButton = getByText('Explore Now');
    expect(exploreButton).toBeInTheDocument();
  });

  it('displays the environmental message', () => {
    const { getByText } = render(<AboutPage />);
    const environmentalMessage = getByText('“Style define you!.” — Our Team');
    expect(environmentalMessage).toBeInTheDocument();
  });

  it('links to the products page', () => {
    const { getByText } = render(<AboutPage />);
    const exploreButton = getByText('Explore Now');
    expect(exploreButton).toHaveAttribute('href', '/products');
  });
});
