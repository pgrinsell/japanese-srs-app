import * as React from 'react';
import Typography from '@mui/joy/Typography';
import useLocalforage from '../useLocalforage';
import Card from './Card';
import Link from '@mui/joy/Link';

const ReviewsCard = () => {
  const [reviews] = useLocalforage('reviews', []);
  const reviewsDue = reviews.filter(r => Date.now() > r.nextReview);

  // on click navigate to reviews page

  return (
    <Card>
      <Typography level="h2" fontSize="md">
        <Link
          href="/reviews"
          overlay
          underline="none"
        >
          Reviews
        </Link>
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
