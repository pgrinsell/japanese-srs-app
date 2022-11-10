import * as React from 'react';
import useLocalforage from '../useLocalforage';

const ReviewsPage = () => {
  const [reviews] = useLocalforage('reviews', []);

  console.log('reviews', reviews);

  return (
    <p>reviews: {reviews.length}</p>
  );
};

export default ReviewsPage;
