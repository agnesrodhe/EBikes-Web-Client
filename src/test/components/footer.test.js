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
