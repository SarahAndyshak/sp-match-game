import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AnswerTable from './AnswerTable';

function DragCard({ answers, questions, resultsQuestions, resultsAnswers }) {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [allHidden, setAllHidden] = useState(false);

  const dragStart = (event) => {
    const id = event.target.id;
    setSelectedId(id);
    console.log('drag started');
  };

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

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
    // setSelectedId(null);
    // drag drop does not seem to reset the selectedId back to null when it is dropped. when setSelectedId(null) is commented out, the drag and drop function stops working.
  };

  useEffect(() => {
    console.log(selectedId);
    console.log(dropTargetId);
  }, [selectedId, dropTargetId]);


  //by using a useEffect we solve our issue of state not being updated when the if then statement is called to check for equality of selectedId and dropTargetId
  useEffect(() => {
    if (selectedId && dropTargetId) {

      const selectedElement = document.getElementById(selectedId);
      const dropTargetElement = document.getElementById(dropTargetId);

      console.log(selectedElement.parentElement);
      console.log(dropTargetElement.parentElement);

      console.log(selectedElement.getAttribute('data-name'));
      console.log(dropTargetElement.getAttribute('data-name'));

      const selectedName = selectedElement.getAttribute('data-name');
      const dropTargetName = dropTargetElement.getAttribute('data-name');


      // if the id of the selected element equals the id of the target element, we continue with our function.
      if (selectedElement !== dropTargetElement && selectedName === dropTargetName) {
        console.log('Yay it works!');
        const selectedElement = document.getElementById(selectedId);
        const dropTargetElement = document.getElementById(dropTargetId);


        // this is a null check, so if these variables are not assigned values, the if then statement will not run.
        if (selectedElement && dropTargetElement) {
          // selectedElement.style.display = 'none';
          selectedElement.style.display = 'none';
          dropTargetElement.style.display = 'none';

          // Find matching answer element with the same ID value and set its display to 'none'
          // const matchingAnswerElement = document.querySelector(
          //   `.answerList.draggableItem[id="${dropTargetName}"]`
          // );

          // same here - if matchingAnswerElement is not assigned a value, the statement will not run. This prevents the error: Cannot read properties of null (reading 'style')
          // if (matchingAnswerElement) {
          //   matchingAnswerElement.style.display = 'none';
          // }
        }
      } else {
        console.log('try again');
      }


      const resetDragStyles = () => {
        const draggableItems = document.querySelectorAll('.draggableItem');
        draggableItems.forEach((item) => {
          item.classList.remove('over');
        });
      };

      resetDragStyles();
    } else {
      console.log("Both elements do not exist yet")
    }

  }, [selectedId, dropTargetId]);

  useEffect(() => {
    if (questions && answers) {
      const draggableListItems = document.querySelectorAll('.draggableItem');
      draggableListItems.forEach((item) => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
      });

      return () => {
        const draggableListItems = document.querySelectorAll('.draggableItem');
        draggableListItems.forEach((item) => {
          item.removeEventListener('dragstart', dragStart);
          item.removeEventListener('dragenter', dragEnter);
          item.removeEventListener('drop', dragDrop);
          item.removeEventListener('dragover', dragOver);
          item.removeEventListener('dragleave', dragLeave);
        });
      };
    }
  }, [questions, answers]);


  useEffect(() => {
    if (selectedId && dropTargetId && questions) {
      // Check if all elements are hidden
      const allHidden = questions.every((question) => { // << change questions to questionList
        const questionElement = document.getElementById(question.id);
        return questionElement.style.display === 'none';
      }) && answers.every((answer) => { // << change answers to answerLIst
        const answerElement = document.getElementById(answer.id);
        return answerElement.style.display === 'none';
      });

      if (allHidden) {
        setAllHidden(true);
        // console.log('All elements are hidden');
      }
    }
  }, [selectedId, dropTargetId, questions]);


  return (
    <Grid container spacing={2} style={{ display: "flex"}}>
      <Grid item xs={6} style={{ display: "flex", flexDirection: "column"}}>
        
      {!allHidden && (
        <h3>Questions:</h3>
          )}

        {/* Generating cards, including image (if exists) */}
        {questions?.map((question, id, qImage) => ( // << change questions to questionList
          <Paper 
            // style = {{ flexGrow: 1 }}
              className="draggableItem questionList"
              key={question.id}
              draggable="true"
              id={question.id}
              data-name={question.name}
            >
              {question.q}
              <br />
              {question.qImage && (
                <img src={question.qImage}
                  style={{ height: "10rem" }} /> // scale image as rem or px?
              )}
          </Paper>
        ))}

      </Grid>
      <Grid item xs={6} style={{display: "flex", flexDirection: "column"}}>
      {!allHidden && (
        <h3>Answers:</h3>
          )}
        {answers?.map((answer, id) => ( // << change answers to answerList
          <Paper
            // style={{ flexGrow: 1, textAlign: "center" }}
            className="draggableItem answerList"
            key={answer.id}
            draggable="true"
            id={answer.id}
            data-name={answer.name}
            >
            {answer.a}
          </Paper>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center"> {/* Center the winMessage horizontally */}
          {allHidden && (
          // <p className='winMessage'>You win!</p>
            <AnswerTable
              questions={resultsQuestions}
              answers={resultsAnswers}
            />
          )}
          
        </Grid>
      </Grid>

    </Grid>
  );
}

export default DragCard;