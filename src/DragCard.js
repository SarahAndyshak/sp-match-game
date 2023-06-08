import React, { useState, useEffect, useCallback, useRef } from 'react';
import './DragCard.css';
// import { Container, Row, Col } from 'react-bootstrap';
import { Grid, Paper } from '@mui/material';

function DragCard() {

  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  // may be better to switch this to let matchingCounter = 0;
  const [matchingCounter, setMatchingCounter] = useState(0);

  // this sets the event listeners when the page is loaded
  useEffect(() => {
    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);


  // transforming his functions into consts
  const dragStart = () => {
    const id = this.id;
    setSelectedId(id);
  }

  const dragEnter = () => {
    this.classList.add('over');
  }

  const dragLeave = () => {
    this.classList.remove('over');
  }

  const dragOver = (ev) => {
    ev.preventDefault();
  }

  const dragDrop = () => {
    const id = this.id;
    setDropTargetId(id);

    if (checkForMatch(selectedId, dropTargetId)) {
      document.getElementById(selectedId).style.display = 'none';
      document.getElementById(dropTargetId).style.display = 'none';
      console.log('Yay it works!')
      matchingCounter++;
    }

    // if (matchingCounter === 5) {
    //   endMessage.style.display = 'block';
    // }

    this.classList.remove('over');
  }

  // check id variable names
  const checkForMatch = (selectedId, dropTargetId) => {
    if (selectedId === dropTargetId) {
      return true;
    } else {
      return false;
    }
  }



  const draggableListItems = document.querySelectorAll('.draggableItem');

  // something needs fixed here
  const addEventListeners = () => {
    draggableListItems.forEach(item => {
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragover', dragOver);
      item.addEventListener('dragleave', dragLeave);
    })
  }

  function removeEventListeners() {
    draggableListItems.forEach((item) => {
      item.removeEventListener('dragstart', dragStart);
      item.removeEventListener('dragenter', dragEnter);
      item.removeEventListener('drop', dragDrop);
      item.removeEventListener('dragover', dragOver);
      item.removeEventListener('dragleave', dragLeave);
    });
  }



  // hard coded questions
  const questionList = [
    {
      q: 'What color is the sky?',
      id: 1
    },
    {
      q: 'What is your name?',
      id: 2
    },
    {
      q: 'Nice to meet you',
      id: 3
    },
    {
      q: 'What is the capitol of Oregon',
      id: 4
    },
    {
      q: 'What is the national bird',
      id: 5
    }

  ];

  const answerList = [
    {
      a: 'Blue',
      id: 1
    },
    {
      a: '¿Cómo te llamas?',
      id: 2
    },
    {
      a: 'Mucho gusto',
      id: 3
    },
    {
      a: 'Salem',
      id: 4
    },
    {
      a: 'the bald eagle',
      id: 5
    }

  ];

  // checking to make sure ID match questions and answers
  console.log('Logging question IDs:', questionList.map((question) => `${question.q} ${question.id}`));

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper>
          <h3>Questions:</h3>
          {questionList.map((question, id) => (
            <p className='questionList draggableItem'
              key={id}
              draggable='true'>
              {question.q}</p>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <h3>Answers:</h3>
          {answerList.map((answer, id) => (
            <p className='answerList draggableItem'
              key={id}
              draggable='true'>
              {answer.a}</p>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}



export default DragCard