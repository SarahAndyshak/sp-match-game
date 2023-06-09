import React, { useState, useEffect } from 'react';
import DragCard from './DragCard';

const DragCardParent = () => {
  useEffect(() => {
    console.log('rerendered parent')
  }, [])


  const [initQuestionList, setInitQuestionList] = useState([
    {
      q: 'What color is the sky?',
      id: 1,
    },
    {
      q: 'What is your name?',
      id: 2,
    },
    {
      q: 'Nice to meet you',
      id: 3,
    },
    {
      q: 'What is the capital of Oregon',
      id: 4,
    },
    {
      q: 'What is the national bird',
      id: 5,
    },
  ]);

  const [initAnswerList, setInitAnswerList] = useState([
    {
      a: 'Blue',
      id: 1,
    },
    {
      a: '¿Cómo te llamas?',
      id: 2,
    },
    {
      a: 'Mucho gusto',
      id: 3,
    },
    {
      a: 'Salem',
      id: 4,
    },
    {
      a: 'the bald eagle',
      id: 5,
    },
  ]);
  

  return (
    <DragCard
      initAnswerList={initAnswerList}
      setInitAnswerList={setInitAnswerList}
      initQuestionList={initQuestionList}
      setInitQuestionList={setInitQuestionList}
    />
  )
}

export default DragCardParent