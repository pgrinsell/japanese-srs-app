import * as React from 'react';
import Typography from '@mui/joy/Typography';
import useLocalforage from '../useLocalforage';
import Card from './Card';

const ReviewsCard = () => {
  const [reviews] = useLocalforage('reviews', []);
  const reviewsDue = reviews.filter(r => Date.now() > r.nextReview);

  // on click navigate to reviews page

  return (
    <Card>
      <Typography level="h2" fontSize="md">
        Reviews
      </Typography>
      {reviewsDue.length > 0 ? (
        <Typography>
          You have {reviewsDue.length} new {reviewsDue.length === 1 ? 'review' : 'reviews'}.
        </Typography>
      ) : (
        <Typography>You have no new reviews.</Typography>
      )}
    </Card>
  );
};

export default ReviewsCard;
