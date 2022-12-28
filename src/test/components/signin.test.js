import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import User from '../../components/pages/login/signin';

afterEach(cleanup);

it('redirects the user to the correct URL if role is equal to "customer"', () => {
    const { getByText } = render(<User token="123" role="customer" fullUser="" />);

    // Find the "Oops... Har du gått vilse?" element and simulate a click event
    fireEvent.click(getByText('Oops... Har du gått vilse?'));
  
    // Verify that the window.location.replace function was called with the correct URL
    expect(window.location.replace).toHaveBeenCalledWith('http://localhost:3001/');
  });