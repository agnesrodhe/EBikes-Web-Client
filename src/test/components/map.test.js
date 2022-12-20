import React from 'react';
import { render, act, wait } from '@testing-library/react';
import MapCity from '../../components/pages/admin/handleBikes/components/map';

test('renders MapCity component', async () => {
  let center = { lat: 0, lng: 0 };
  let city = 'City 1';
  let cityID = { current: 'city-1-id' };

  let component;
  await act(async () => {
    component = render(
      <MapCity center={center} city={city} cityID={cityID} />
    );
  });

  // verify that the map is displayed
  expect(component.container).toMatchSnapshot();
});
