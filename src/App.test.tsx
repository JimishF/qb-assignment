import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from './App';

test('renders Signin page', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByLabelText(/Email Address/i)).toBeInTheDocument();
});
