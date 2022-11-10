import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StartPage from './components/StartPage';
import ReviewsPage from './components/ReviewsPage';

const theme = extendTheme({
  components: {
    JoyTextField: {
      defaultProps: {
        color: 'primary',
        variant: 'soft'
      }
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/reviews',
    element: <ReviewsPage />
  }
]);

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
};

export default App;
