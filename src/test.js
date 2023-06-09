import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper } from '@mui/material';

function DragCard() {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [matchingCounter, setMatchingCounter] = useState(0);


  const draggableListItems = document.querySelectorAll('.draggableItem');
  
  const addEventListeners = () => {
    draggableListItems.forEach((item) => {
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragover', dragOver);
      item.addEventListener('dragleave', dragLeave);
    });
  };

  const removeEventListeners = () => {
    draggableListItems.forEach((item) => {
      item.removeEventListener('dragstart', dragStart);
      item.removeEventListener('dragenter', dragEnter);
      item.removeEventListener('drop', dragDrop);
      item.removeEventListener('dragover', dragOver);
      item.removeEventListener('dragleave', dragLeave);
    });
  };

  const dragStart = (event) => {
    const id = event.target.id;
    setSelectedId(id);
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

  const dragDrop = (event) => {
    event.preventDefault();
    const id = event.target.id;
    setDropTargetId(id);

    if (checkForMatch(selectedId, dropTargetId)) {
      document.getElementById(selectedId).style.display = 'none';
      document.getElementById(dropTargetId).style.display = 'none';
      console.log('Yay it works!');
      setMatchingCounter((prevCounter) => prevCounter + 1);
    }

    event.target.classList.remove('over');
  };

  const checkForMatch = (selectedId, dropTargetId) => {
    return selectedId === dropTargetId;
  };

  useEffect(() => {
    addEventListeners();

    return () => {
      removeEventListeners();
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



useEffect(() => {
  const dragDiv = dragRef.current;

  dragDiv?.addEventListener('touchstart', onMouseDown, true);
  dragDiv?.addEventListener('mousedown', onMouseDown, true);

  return () => {
    dragDiv?.removeEventListener('mousedown', onMouseDown, true);
    dragDiv?.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('mousemove', onMouseMove, true);

    dragDiv?.removeEventListener('touchstart', onMouseDown, true);
    dragDiv?.removeEventListener('touchend', onMouseUp, true);
    document.removeEventListener('touchmove', onMouseMove, true);

    document.removeEventListener('contextmenu', onContextMenu, false);
  }
}, []);