import { render, screen } from '@testing-library/react';
import App from './App';

/*
*/
test('renders ', () => {
  const { container } = render(<App />);

  expect(screen.getByText(/folinodocs/i)).toBeInTheDocument();
});