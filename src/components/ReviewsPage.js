import { useState, useEffect } from 'react';
import useLocalforage from '../useLocalforage';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Card from './Card';
import QuestionCard from './QuestionCard';

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
