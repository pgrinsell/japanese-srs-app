import { useState, useEffect } from 'react';
import useLocalforage from '../useLocalforage';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
    onSubmitAnswer(e.value);
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

const ReviewsPage = () => {
  const [reviews] = useLocalforage('reviews', []);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);

  const handleSetQuestions = () => {
    // todo implement default batch size

    const testQuestions = [
      ...reviews.map(r => ({ type: 'meaning', question: r.reading, answers: r.meanings })),
      ...reviews.map(r => ({ type: 'reading', question: r.meanings[0], answers: [r.reading] }))
    ];

    // todo shuffle test

    setQuestions(testQuestions);
  };

  const handleSubmitAnswer = answer => {
    const newQuestions = [...questions];
    const question = newQuestions.shift();
    const isCorrect = Boolean(question.answers.find(a => a.toLocaleLowerCase() === answer.toLocaleLowerCase()));

    if (isCorrect) {
      console.log('correct');
      setQuestions(newQuestions);
      // todo update the reviews with the result of the test
    }
    else {
      // todo update the reviews with the result of the test
      setQuestions([...newQuestions, question]);
    }
  };

  useEffect(() => {
    handleSetQuestions();
  }, [reviews]);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestion(questions[0]);
    }
  }, [questions]);
  
  useEffect(() => {
    console.log('question', question);
  }, [question]);

  console.log('questions', questions);

  if (questions.length === 0) {
    return (
      <Card>
        <Typography>
          Done
        </Typography>
      </Card>
    );
  }

  if (question) {
    return (
      <>
        <Button
          component={Link}
          href="/"
          underline="none"
          sx={{ mt: 2, ml: 2 }}
          variant="outlined"
          startDecorator={<ChevronLeftIcon />}
          size="sm"
        >
          Back
        </Button>
        <QuestionCard
          question={question}
          onSubmitAnswer={handleSubmitAnswer}
        />
      </>
    );
  }

  return null;
};

export default ReviewsPage;
