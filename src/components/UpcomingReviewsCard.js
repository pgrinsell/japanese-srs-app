import { useState, useEffect } from 'react';
import Typography from '@mui/joy/Typography';
import { add } from 'date-fns';
import useLocalforage from '../useLocalforage';
import Card from './Card';

const UpcomingReviewsCard = () => {
  const [reviews] = useLocalforage('reviews', []);
  const [upcomingReviews, setUpcomingReviews] = useState([]);

  useEffect(() => {
    if (Boolean(reviews)) {
      setUpcomingReviews(reviews.filter(r => add(Date.now(), { days: 1 }) > r.nextReview));
    }
  }, [reviews]);

  return (
    <Card>
      <Typography level="h2" fontSize="md">
        Schedule
      </Typography>
      {upcomingReviews.length > 0 ? (
        <Typography>
          You have {upcomingReviews.length} {upcomingReviews.length === 1 ? 'review' : 'reviews'} scheduled.
        </Typography>
      ) : (
        <Typography>
          You have no reviews scheduled.
        </Typography>
      )}
    </Card>
  );
};

export default UpcomingReviewsCard;
