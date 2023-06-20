import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AnswerTable from './AnswerTable';

function DragCard({ answers, questions, resultsQuestions, resultsAnswers }) {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [allHidden, setAllHidden] = useState(false);
  const [answerStyle, setAnswerStyle] = useState(false);
  const [questionStyle, setQuestionStyle] = useState(false);

  console.log('answerStyle', answerStyle);
  // console.log('dropTargetId', setDropTargetId);

  const dragStart = (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      const id = event.target.parentElement.id;
      setSelectedId(id);
    } else {
      const id = event.target.id;
      setSelectedId(id);
    }
    // console.log('drag started');
  };

  useEffect(() => {
    //console.log(selectedId);
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
    if (event.target.tagName.toLowerCase() === "img") {
      const id = event.target.parentElement.id;
      setDropTargetId(id);
    } else {
      const id = event.target.id;
      setDropTargetId(id);
    } 
    // setSelectedId(null);
    // drag drop does not seem to reset the selectedId back to null when it is dropped. when setSelectedId(null) is commented out, the drag and drop function stops working.
  };




  //by using a useEffect we solve our issue of state not being updated when the if then statement is called to check for equality of selectedId and dropTargetId
  useEffect(() => {
    if (selectedId && dropTargetId) {

      const selectedElement = document.getElementById(selectedId);
      const dropTargetElement = document.getElementById(dropTargetId);

      // console.log(selectedElement.parentElement);
      // console.log(dropTargetElement.parentElement);

      // console.log(selectedElement.getAttribute('data-name'));
      // console.log(dropTargetElement.getAttribute('data-name'));

      const selectedName = selectedElement.getAttribute('data-name');
      const dropTargetName = dropTargetElement.getAttribute('data-name');

      //console.log('selectedName', selectedName)
      //console.log('dropTargetName', dropTargetName)


      // if the id of the selected element equals the id of the target element, we continue with our function.
      if (selectedElement !== dropTargetElement && selectedName === dropTargetName) {
        //console.log('Yay it works!');
        const selectedElement = document.getElementById(selectedId);
        const dropTargetElement = document.getElementById(dropTargetId);


        // this is a null check, so if these variables are not assigned values, the if then statement will not run.
        if (selectedElement && dropTargetElement) {
          // selectedElement.style.display = 'none';
          selectedElement.style.display = 'none';
          dropTargetElement.style.display = 'none';

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
      setSelectedId(null);
      setDropTargetId(null);
      setAnswerStyle(false);
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


  // Check if click events match
  const handleClick = (event) => {
    if (selectedId) {
      // Do the drop functionality - set dropTargetId
      if (event.target.tagName.toLowerCase() === "img") {
        const id = event.target.parentElement.id;
        setDropTargetId(id);
      } else {
        const id = event.target.id;
        setDropTargetId(id);
      } 
    } else {
      // Do the start drag functionality - set selectedId
      if (event.target.tagName.toLowerCase() === "img") {
        const id = event.target.parentElement.id;
        console.log('id is generating TAG NAME', id);
        setSelectedId(id);
        // Check if paper style needs to be updated
        setAnswerStyle(id)
      } else {
        const id = event.target.id;
        console.log('id is generating', id);
        setSelectedId(id);
        // Check if paper style needs to be updated
        setAnswerStyle(id)
      }

    }
  }

  // // Setting up scattered positioning of cards
  // // if w > h
  // const w = window.innerWidth;
  // const h = window.innerHeight;


  // console.log("window dimensions: ");
  // console.log(w);
  // console.log(h);

  // let left;
  // let right;

  // // if h > w
  // const adjustedW = w * .8;
  // const adjustedH = h * .8;

  // let top;
  // let bottom;

  // if (w > h) {
  //   left = adjustedW * 0.5
  //   right = w - adjustedW * 0.5
  //   } else if (h > w) {
  //   top = adjustedH * 0.5
  //   bottom = h - adjustedH * 0.5
  // }

  // // if w > h
  // function rightPosition() {
  //   const position = left + Math.floor(Math.random() * (right * 0.8));
    
  //   if (position > (w * .85) || position < (w * .5)) {
  //     return rightPosition(); // Call itself again
  //   }
    
  //   return position;
  // }

  // function leftPosition() {
  //   return Math.floor(Math.random() * (left * 0.9));
  // }

  // // if h > w
  // function topPosition() {
  //   return Math.floor(Math.random() * (top * 0.9));
  // }

  // function bottomPosition() {
  //   const position = top + Math.floor(Math.random() * (bottom * 0.8));
    
  //   if (position > (h * .85) || position < (h * .5)) {
  //     return bottomPosition(); // Call itself again
  //   }
    
  //   return position;
  // }





// original logic for two columns

  // return (
  //   <Grid container spacing={2} style={{ display: "flex"}}>
  //     <Grid item xs={6} style={{ display: "flex", flexDirection: "column"}}>
        
  //     {!allHidden && (
  //       <h3>Questions:</h3>
  //         )}

  //       {/* Generating cards, including image (if exists) */}
  //       {questions?.map((question) => ( // << change questions to questionList
  //         <Paper 
  //             className="draggableItem questionList"
  //             key={question.id}
  //             draggable="true"
  //             id={question.id}
  //             data-name={question.name}
  //             onClick={(e) => handleClick(e)}
  //             style={{
  //               outline: answerStyle === question.id ? '3px solid blue' : 'inherit',
  //               cursor:'grab !important',
  //               // left: leftPosition(), 
  //               // top: Math.floor(Math.random() * adjustedH)
  //             }}
  //           >
  //             {question.q}
  //             <br />
  //             {question.qImage && (
  //               <img src={question.qImage}
  //               style={{ height: "10rem", pointerEvents:'none' }} /> // scale image as rem or px?
  //               )}
  //         </Paper>
  //       ))}
  //     </Grid>

  //     <Grid item xs={6} style={{display: "flex", flexDirection: "column"}}>
  //     {!allHidden && (
  //       <h3>Answers:</h3>
  //         )}
  //       {answers?.map((answer) => ( // << change answers to answerList
  //         <Paper
  //           className="draggableItem answerList"
  //           key={answer.id}
  //           draggable="true"
  //           id={answer.id}
  //           data-name={answer.name}
  //           onClick={(e) => handleClick(e)}
  //           style={{
  //             outline: answerStyle === answer.id ? '3px solid blue' : 'inherit',
  //             cursor:'grab !important', 
  //             // left: rightPosition(), 
  //             // top: Math.floor(Math.random() * adjustedH)
  //           }}
  //         >
  //           {answer.a}
  //         </Paper>
  //       ))}
  //     </Grid>

  //     <Grid item xs={12}>
  //       <Grid container justifyContent="center"> {/* Center the winMessage horizontally */}
  //         {allHidden && (
  //         // <p className='winMessage'>You win!</p>
  //           <AnswerTable
  //             questions={resultsQuestions}
  //             answers={resultsAnswers}
  //           />
  //         )}
          
  //       </Grid>
  //     </Grid>

  //   </Grid>
  // );

// Using Grid from MUI to place objects into a single grid
    return (
    <Grid container spacing={2} style={{ display: "flex"}} className='allCards'>
      {/* <Grid item xs={6} style={{ display: "flex", flexDirection: "column"}}> */}
        
      {!allHidden 
      // && (
      //   <h3>Questions:</h3>
      //     )
          }

        {/* Generating cards, including image (if exists) */}
        {questions?.map((question) => ( // << change questions to questionList
          <Paper 
              className="draggableItem questionList"
              key={question.id}
              draggable="true"
              id={question.id}
              data-name={question.name}
              onClick={(e) => handleClick(e)}
              style={{
                outline: answerStyle === question.id ? '3px solid blue' : 'inherit',
                cursor:'grab !important',
                // left: leftPosition(), 
                // top: Math.floor(Math.random() * adjustedH)
              }}
            >
              {question.q}
              <br />
              {question.qImage && (
                <img src={question.qImage}
                style={{ height: "10rem", pointerEvents:'none' }} /> // scale image as rem or px?
                )}
          </Paper>
        ))}

      {/* <Grid item xs={6} style={{display: "flex", flexDirection: "column"}}> */}
      {!allHidden 
      // && (
      //   <h3>Answers:</h3>
      //     )
          }
        {answers?.map((answer) => ( // << change answers to answerList
          <Paper
            className="draggableItem answerList"
            key={answer.id}
            draggable="true"
            id={answer.id}
            data-name={answer.name}
            onClick={(e) => handleClick(e)}
            style={{
              outline: answerStyle === answer.id ? '3px solid blue' : 'inherit',
              cursor:'grab !important', 
              // left: rightPosition(), 
              // top: Math.floor(Math.random() * adjustedH)
            }}
          >
            {answer.a}
          </Paper>
        ))}

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



  // experimental logic for scattered cards
  // let newSize;
  // if (w > h){
  // // newSize = () => (
  //   return (
  //       <div>
  //       {!allHidden && (
  //         <h3>Questions:</h3>
  //           )}
    
  //         {/* Generating cards, including image (if exists) */}
  //         {questions?.map((question) => (
  //           <Paper 
  //               className="draggableItem questionList"
  //               key={question.id}
  //               draggable="true"
  //               id={question.id}
  //               data-name={question.name}
  //               onClick={(e) => handleClick(e)}
  //               style={{
  //                 outline: answerStyle === question.id ? '3px solid blue' : 'inherit',
  //                 cursor:'grab !important',
  //                 left: leftPosition(), 
  //                 top: Math.floor(Math.random() * adjustedH)
  //               }}
  //             >
  //               {question.q}
  //               <br />
  //               {question.qImage && (
  //                 <img src={question.qImage}
  //                 style={{ height: "10rem", pointerEvents:'none' }} /> // scale image as rem or px?
  //                 )}
  //           </Paper>
  //         ))}
    
  //       {!allHidden && (
  //         <h3>Answers:</h3>
  //           )}
  //         {answers?.map((answer) => (
  //           <Paper
  //             className="draggableItem answerList"
  //             key={answer.id}
  //             draggable="true"
  //             id={answer.id}
  //             data-name={answer.name}
  //             onClick={(e) => handleClick(e)}
  //             style={{
  //               outline: answerStyle === answer.id ? '3px solid blue' : 'inherit',
  //               cursor:'grab !important', 
  //               left: rightPosition(), 
  //               top: Math.floor(Math.random() * adjustedH)
  //             }}
  //           >
  //             {answer.a}
  //           </Paper>
  //         ))}
    
  //       {/* Center the winMessage horizontally */}
  //           {allHidden && (
  //           // <p className='winMessage'>You win!</p>
  //             <AnswerTable
  //               questions={resultsQuestions}
  //               answers={resultsAnswers}
  //             />
  //           )}
  //           </div> 
    
    
  //   );
  //   } else if (h > w) {
  //     return (
  //   // newSize = () => (
  //       <div>
  //       {!allHidden && (
  //         <h3>Questions:</h3>
  //           )}
    
  //         {/* Generating cards, including image (if exists) */}
  //         {questions?.map((question) => (
  //           <Paper 
  //               className="draggableItem questionList"
  //               key={question.id}
  //               draggable="true"
  //               id={question.id}
  //               data-name={question.name}
  //               onClick={(e) => handleClick(e)}
  //               style={{
  //                 outline: answerStyle === question.id ? '3px solid blue' : 'inherit',
  //                 cursor:'grab !important',
  //                 left: leftPosition(), 
  //                 top: Math.floor(Math.random() * adjustedH)
  //               }}
  //             >
  //               {question.q}
  //               <br />
  //               {question.qImage && (
  //                 <img src={question.qImage}
  //                 style={{ height: "10rem", pointerEvents:'none' }} /> // scale image as rem or px?
  //                 )}
  //           </Paper>
  //         ))}
    
  //       {!allHidden && (
  //         <h3>Answers:</h3>
  //           )}
  //         {answers?.map((answer) => (
  //           <Paper
  //             className="draggableItem answerList"
  //             key={answer.id}
  //             draggable="true"
  //             id={answer.id}
  //             data-name={answer.name}
  //             onClick={(e) => handleClick(e)}
  //             style={{
  //               outline: answerStyle === answer.id ? '3px solid blue' : 'inherit',
  //               cursor:'grab !important', 
  //               left: rightPosition(), 
  //               top: Math.floor(Math.random() * adjustedH)
  //             }}
  //           >
  //             {answer.a}
  //           </Paper>
  //         ))}
    
  //       {/* Center the winMessage horizontally */}
  //           {allHidden && (
  //           // <p className='winMessage'>You win!</p>
  //             <AnswerTable
  //               questions={resultsQuestions}
  //               answers={resultsAnswers}
  //             />
  //           )}
            
    
  //   </div>
  //   );
  //   }







}

export { DragCard };
