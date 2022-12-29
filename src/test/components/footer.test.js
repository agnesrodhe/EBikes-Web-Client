import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../components/footer/footer';

test('Footer component renders correctly', () => {
  const { getByText } = render(<Footer />);
  const locationElement = getByText(/Hitta oss/i);
  const phoneElement = getByText(/Ring oss/i);
  const emailElement = getByText(/Maila oss/i);
  const copyrightElement = getByText(/Copyright/i);

  expect(locationElement).toBeInTheDocument();
  expect(phoneElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(copyrightElement).toBeInTheDocument();
});

it('renders the contact information and icons correctly', () => {
  const { getByText, getByTestId } = render(<Footer />);

  // Check that the location heading and address are rendered correctly
  expect(getByText('Hitta oss')).toBeInTheDocument();
  expect(getByText('Valhallavägen 1, 371 41 Karlskrona')).toBeInTheDocument();

  // Check that the phone heading and number are rendered correctly
  expect(getByText('Ring oss')).toBeInTheDocument();
  expect(getByText('012-3456789')).toBeInTheDocument();

  // Check that the email heading and address are rendered correctly
  expect(getByText('Maila oss')).toBeInTheDocument();
  expect(getByText('mail@mail.se')).toBeInTheDocument();
});


it('renders the correct class names on the div elements', () => {
  const { container } = render(<Footer />);

  // Check that the outermost div element has the correct class name
  expect(container.firstChild).toHaveClass('footer-section');

  // Check that the contact information and icons div has the correct class name
  expect(container.firstChild.firstChild).toHaveClass('footer-cta');

  // Check that the copyright notice and links div has the correct class name
  expect(container.firstChild.lastChild).toHaveClass('copyright-area');

  // Check that the footer menu div has the correct class name
  expect(container.firstChild.lastChild.lastChild).toHaveClass('footer-menu');
});

it('renders the copyright notice and links correctly', () => {
  const { getByText, getByTestId } = render(<Footer />);

  // Check that the copyright notice is rendered correctly
  expect(getByText('Copyright © 2023, All Right Reserved WEBIKE AB.')).toBeInTheDocument();

  // Check that the list of links is rendered correctly
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Terms')).toBeInTheDocument();
  expect(getByText('Privacy')).toBeInTheDocument();
  expect(getByText('Policy')).toBeInTheDocument();
  expect(getByText('Contact')).toBeInTheDocument();
});