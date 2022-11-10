import { useState } from 'react';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { toKana, isKana } from 'wanakana';
import { add } from 'date-fns';
import useLocalforage from '../useLocalforage';
import Card from './Card';

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

const LessonCard = () => {
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
    <Card>
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

export default LessonCard;
