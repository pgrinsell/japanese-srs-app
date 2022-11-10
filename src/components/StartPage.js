import * as React from 'react';
import LessonCard from './LessonCard';
import ReviewsCard from './ReviewsCard';
import UpcomingReviewsCard from './UpcomingReviewsCard';

const StartPage = () => {
  return (
    <>
      <LessonCard />
      <ReviewsCard />
      <UpcomingReviewsCard />
    </>
  );
};

export default StartPage;
