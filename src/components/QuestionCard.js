import { useState } from 'react';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { toKana, isKana } from 'wanakana';
import Card from './Card';

const QuestionCard = ({ question, onSubmitAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSetAnswer = value => {
    const convertedValue = question.type === 'reading' ? toKana(value, { IMEMode: true }) : value;
    setAnswer(convertedValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitAnswer(answer);
  };

  return (
    <Card>
      <Typography
        level="h2"
        sx={{
          textAlign: 'center',
          mb: 2
        }}
      >
        {question.question}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder={question.type === 'reading' ? 'Reading' : 'Meaning'}
          value={answer}
          onChange={e => handleSetAnswer(e.target.value)}
          sx={{ textAlign: 'center' }}
          endDecorator={(
            <Button
              type="submit"
              variant="plain"
              sx={{ p: 0 }}
            >
              <ChevronRightIcon />
            </Button>
          )}
        />
        {/* <Button
          type="submit"
        //disabled={reading.length === 0 || meaning.length === 0 || !isKana(reading)}
        >
          Submit
        </Button> */}
      </form>
    </Card>
  );
};

export default QuestionCard;
