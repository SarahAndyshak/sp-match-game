import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper } from '@mui/material';

function DragCard() {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [matchingCounter, setMatchingCounter] = useState(0); 


  // const draggableListItems = document.querySelectorAll('.draggableItem');
  
  // const addEventListeners = () => {
  //   // const draggableListItems = document.querySelectorAll('.draggableItem');

  //   draggableListItems.forEach((item) => {
  //     item.addEventListener('dragstart', dragStart);
  //     item.addEventListener('dragenter', dragEnter);
  //     item.addEventListener('drop', dragDrop);
  //     item.addEventListener('dragover', dragOver);
  //     item.addEventListener('dragleave', dragLeave);
  //   });
  // };

  // const removeEventListeners = () => {
  //   // const draggableListItems = document.querySelectorAll('.draggableItem');

  //   draggableListItems.forEach((item) => {
  //     item.removeEventListener('dragstart', dragStart);
  //     item.removeEventListener('dragenter', dragEnter);
  //     item.removeEventListener('drop', dragDrop);
  //     item.removeEventListener('dragover', dragOver);
  //     item.removeEventListener('dragleave', dragLeave);
  //   });
  // };

  const dragStart = (event) => {
    const startId = event.target.id;
    setSelectedId(startId);
    console.log('drag started')
  };

  const dragEnter = (event) => {
    event.target.classList.add('over');
  };

  const dragLeave = (event) => {
    event.target.classList.remove('over');
  };

  const dragOver = (event) => {
    event.preventDefault();
  };
  
  // const checkForMatch = (selectedId, dropTargetId) => {
  //   return selectedId === dropTargetId;
  // };

  const dragDrop = (event) => {
    event.preventDefault();
    const startId = parseInt(selectedId); // currently thinks this value is null
    const dropId = event.target.id;
    setDropTargetId(dropId);
    const endId = parseInt(dropId);

// need to parseInt of selectedId and dropId to compare them

    if (startId === endId) {
      // document.getElementById(selectedId).style.display = 'none';
      // document.getElementById(id).style.display = 'none';
      console.log('Yay it works!');
      // setMatchingCounter((prevCounter) => prevCounter + 1);
      // console.log(`${matchingCounter}`);
    } else {
      console.log('try again')
    }

    event.target.classList.remove('over');
  };

  // console log to check selectedId and dropTargetId
  useEffect(() => {
    console.log(selectedId)
    console.log(dropTargetId)
  }, [dropTargetId, dropTargetId]);


  useEffect(() => {
    // addEventListeners();
    const draggableListItems = document.querySelectorAll('.draggableItem');

    draggableListItems.forEach((item) => {
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragover', dragOver);
      item.addEventListener('dragleave', dragLeave);
    });

    return () => {
      // removeEventListeners();
        const draggableListItems = document.querySelectorAll('.draggableItem');

      draggableListItems.forEach((item) => {
        item.removeEventListener('dragstart', dragStart);
        item.removeEventListener('dragenter', dragEnter);
        item.removeEventListener('drop', dragDrop);
        item.removeEventListener('dragover', dragOver);
        item.removeEventListener('dragleave', dragLeave);
      });
    };
  }, []);

  const questionList = [
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
  ];

  const answerList = [
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
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper>
          <h3>Questions 77:</h3>
          {questionList.map((question, id) => (
            <p className="questionList draggableItem" key={id} draggable="true" id={question.id}>
              {question.q}
            </p>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <h3>Answers:</h3>
          {answerList.map((answer, id) => (
            <p className="answerList draggableItem" key={id} draggable="true" id={answer.id}>
              {answer.a}
            </p>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DragCard;
