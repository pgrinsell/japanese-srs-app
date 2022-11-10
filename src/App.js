import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import useLocalforage from './useLocalforage';
import LessonCard from './components/LessonCard';
import ReviewsCard from './components/ReviewsCard';
import UpcomingReviewsCard from './components/UpcomingReviewsCard';

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

const Reviews = () => {
  const [reviews] = useLocalforage('reviews', []);

  console.log('reviews', reviews);

  return (
    <p>reviews: {reviews.length}</p>
  );
};

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <LessonCard />
      <ReviewsCard />
      <UpcomingReviewsCard />
    </CssVarsProvider>
  );
};

export default App;
