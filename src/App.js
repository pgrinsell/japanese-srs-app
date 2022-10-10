import { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { toKana, isKana, isRomaji } from 'wanakana';
import logo from './logo.svg';

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

const App = () => {
  const [reading, setReading] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSubmitLesson = e => {
    e.preventDefault();

    const review = {
      meanings: [meaning.toLowerCase()],
      readings: [reading],
      //nextReview: Date.now()
    };

    console.log('review', review);

    //setState({ reviews: [...state.reviews, review] });
  };

  useEffect(() => {
    console.log(toKana(reading));
  }, [reading]);

  return (
    <CssVarsProvider theme={theme}>
      <Card variant="outlined" sx={{ m: 2 }}>
        <form onSubmit={handleSubmitLesson}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography>Add a new lesson</Typography>
            <TextField
              type="text"
              label="Reading"
              value={reading}
              onChange={e => setReading(e.target.value)}
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
        <Typography>Reviews</Typography>
      </Card>
      <Card variant="outlined" sx={{ m: 2 }}>
        <Typography>Schedule</Typography>
      </Card>
    </CssVarsProvider>
  );
};

export default App;
