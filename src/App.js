import { useState } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { toKana, isKana } from 'wanakana';

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

const defaultState = {
  reviews: []
};

// SRS formula based on WaniKani as described in this blog:
// https://knowledge.wanikani.com/wanikani/srs-stages/
const getNewSrsStage = (currentSrsStage, incorrectAdjustmentCount, srsPenaltyFactor) => {
  return currentSrsStage - (incorrectAdjustmentCount * srsPenaltyFactor);
};

const App = () => {
  const [reading, setReading] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleChange = value => {
    const updatedValue = toKana(value, { IMEMode: true });
    setReading(updatedValue);
  };

  const handleSubmitLesson = e => {
    e.preventDefault();

    const readingAsKana = toKana(reading);

    const review = {
      meanings: [meaning.toLowerCase()],
      readings: [readingAsKana],
      //nextReview: Date.now()
    };

    console.log('review', review);

    //setState({ reviews: [...state.reviews, review] });
  };

  return (
    <CssVarsProvider theme={theme}>
      <Card variant="outlined" sx={{ m: 2 }}>
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
              //error={e => !isKana(e.target.value)}
              //helperText="Please write the reading in kana"
            />
            <TextField
              type="text"
              label="Meaning"
              value={meaning}
              onChange={e => setMeaning(e.target.value)}
            />
            <Button type="submit">Add lesson</Button>
          </Box>
        </form>
      </Card>
      <Card variant="outlined" sx={{ m: 2 }}>
        <Typography level="h2" fontSize="md">
          Reviews
        </Typography>
        <Typography>
          You have no new reviews.
        </Typography>
      </Card>
      <Card variant="outlined" sx={{ m: 2 }}>
        <Typography level="h2" fontSize="md">
          Schedule
        </Typography>
        <Typography>
          You have no reviews scheduled.
        </Typography>
      </Card>
    </CssVarsProvider>
  );
};

export default App;
