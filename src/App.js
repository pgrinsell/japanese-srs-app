import { useState } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { toKana, isKana } from 'wanakana';
import { add } from 'date-fns';
import useLocalforage from './useLocalforage';

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

// SRS formula based on WaniKani as described in this blog:
// https://knowledge.wanikani.com/wanikani/srs-stages/
const getNewSrsStage = (currentSrsStage, incorrectAdjustmentCount, srsPenaltyFactor) => {
  return currentSrsStage - (incorrectAdjustmentCount * srsPenaltyFactor);
};

const stages = [
  // Apprentice 1 → 4 hours → Apprentice 2
  { hours: 4 },
  // Apprentice 2 → 8 hours → Apprentice 3
  { hours: 8 },
  // Apprentice 3 → 1 day → Apprentice 4
  { days: 1 },
  // Apprentice 4 → 2 days → Guru 1
  { days: 2 },
  // Guru 1 → 1 week → Guru 2
  { weeks: 1 },
  // Guru 2 → 2 weeks → Master
  { weeks: 2 },
  // Master → 1 month → Enlightened
  { months: 1 },
  // Enlightened → 4 months → Burned
  { months: 4 }
];

const getNextReviewDateTime = stage => {
  const duration = stages[Math.min(stage, stages.length - 1)];
  return add(Date.now(), duration);
};

const Reviews = () => {
  const [reviews] = useLocalforage('reviews', []);

  console.log('reviews', reviews);

  return (
    <p>reviews: {reviews.length}</p>
  );
};

const LessonCard = ({ cardProps }) => {
  const [reading, setReading] = useState('');
  const [meaning, setMeaning] = useState('');
  const [reviews, setReviews] = useLocalforage('reviews', []);

  const handleChange = value => {
    const updatedValue = toKana(value, { IMEMode: true });
    setReading(updatedValue);
  };

  const handleSubmitLesson = async e => {
    e.preventDefault();

    if (reviews.find(r => r.reading === reading)) {
      console.log('already exists!');
      // todo show error in snackbar
      return;
    }

    const srsStage = 0;

    const review = {
      reading: reading,
      meanings: meaning.split(',').map(m => m.trim().toLowerCase()),
      srsStage,
      nextReview: getNextReviewDateTime(srsStage)
    };

    setReviews([...reviews, review]);
    setMeaning('');
    setReading('');

    // todo show success in snackbar
  };

  return (
    <Card {...cardProps}>
      <form onSubmit={handleSubmitLesson}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography level="h2" fontSize="md">
            Add a new lesson
          </Typography>
          <TextField
            //ref={ref}
            type="text"
            label="Reading"
            value={reading}
            onChange={e => handleChange(e.target.value)}
          //error={reading.length > 0 && !isKana(reading)}
          //helperText="Please write the reading in kana"
          />
          <TextField
            type="text"
            label="Meaning"
            value={meaning}
            onChange={e => setMeaning(e.target.value)}
          />
          <Button
            type="submit"
            disabled={reading.length === 0 || meaning.length === 0 || !isKana(reading)}
          >
            Add Lesson
          </Button>
        </Box>
      </form>
    </Card>
  );
};

const App = () => {
  const [reviews] = useLocalforage('reviews', []);

  const reviewsDue = reviews.filter(r => Date.now() > r.nextReview);
  const upcomingReviews = reviews.filter(r => add(Date.now(), { days: 1 }) > r.nextReview);

  return (
    <CssVarsProvider theme={theme}>
      <LessonCard
        cardProps={{
          variant: 'outlined',
          sx: { m: 2 }
        }}
      />
      <Card variant="outlined" sx={{ m: 2 }}>
        <Typography level="h2" fontSize="md">
          Reviews
        </Typography>
        {reviewsDue.length > 0 ? (
          <Typography>You have {reviewsDue.length} new {reviewsDue === 1 ? 'review' : 'reviews'}.</Typography>
        ) : (
          <Typography>You have no new reviews.</Typography>
        )}
      </Card>
      <Card variant="outlined" sx={{ m: 2 }}>
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
    </CssVarsProvider>
  );
};

export default App;
