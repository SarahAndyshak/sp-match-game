// import React, { useState, useEffect } from 'react';
// import './DragCard.css';
// import { Grid, Paper } from '@mui/material';

// const DragCard = (props) => {
//   // const { initAnswerList, initQuestionList, setInitAnswerList, setInitQuestionList} = props;
//   // const [selectedId, setSelectedId] = useState(null);
//   const [dropTargetId, setDropTargetId] = useState(null);
//   const [matchingCounter, setMatchingCounter] = useState(0);
//   let startId = null;
//   let questionList = [
//     {
//       q: 'What color is the sky?',
//       id: 1,
//     },
//     {
//       q: 'What is your name?',
//       id: 2,
//     },
//     {
//       q: 'Nice to meet you',
//       id: 3,
//     },
//     {
//       q: 'What is the capital of Oregon',
//       id: 4,
//     },
//     {
//       q: 'What is the national bird',
//       id: 5,
//     },
//   ];

//   let answerList = [
//     {
//       a: 'Blue',
//       id: 1,
//     },
//     {
//       a: '¿Cómo te llamas?',
//       id: 2,
//     },
//     {
//       a: 'Mucho gusto',
//       id: 3,
//     },
//     {
//       a: 'Salem',
//       id: 4,
//     },
//     {
//       a: 'the bald eagle',
//       id: 5,
//     },
//   ];
//   console.log('answerList', answerList)

//   const [completedAnswers, setCompletedAnswers] = useState([]);
//   const [completedQuestions, setCompletedQuestions] = useState([]);

  
//   useEffect(() => {
//     console.log('rerendered')
//   }, [])


//   // const draggableListItems = document.querySelectorAll('.draggableItem');
  
//   // const addEventListeners = () => {
//   //   // const draggableListItems = document.querySelectorAll('.draggableItem');

//   //   draggableListItems.forEach((item) => {
//   //     item.addEventListener('dragstart', dragStart);
//   //     item.addEventListener('dragenter', dragEnter);
//   //     item.addEventListener('drop', dragDrop);
//   //     item.addEventListener('dragover', dragOver);
//   //     item.addEventListener('dragleave', dragLeave);
//   //   });
//   // };

//   // const removeEventListeners = () => {
//   //   // const draggableListItems = document.querySelectorAll('.draggableItem');

//   //   draggableListItems.forEach((item) => {
//   //     item.removeEventListener('dragstart', dragStart);
//   //     item.removeEventListener('dragenter', dragEnter);
//   //     item.removeEventListener('drop', dragDrop);
//   //     item.removeEventListener('dragover', dragOver);
//   //     item.removeEventListener('dragleave', dragLeave);
//   //   });
//   // };

//   const dragStart = (event) => {
//     startId = event.target.id;
//     // setSelectedId(startId);
//     console.log('drag started', event)
//   };

//   const dragEnter = (event) => {
//     event.target.classList.add('over');
//   };

//   const dragLeave = (event) => {
//     event.target.classList.remove('over');
//   };

//   const dragOver = (event) => {
//     event.preventDefault();
//   };
  
//   // const checkForMatch = (selectedId, dropTargetId) => {
//   //   return selectedId === dropTargetId;
//   // };

//   const dragDrop = (event) => {
//     // console.log('selectedId', selectedId);
//     event.preventDefault();
//     // const startId = event.srcElement.id; // currently thinks this value is null
//     // console.log('startId', startId);
//     const dropId = event.target.id;

//     setDropTargetId(dropId);
//     // const endId = parseInt(dropId);

// // need to parseInt of selectedId and dropId to compare them

//     console.log(startId === event.target.id)

//     if (startId === event.target.id) {
//       // document.getElementById(selectedId).style.display = 'none';
//       // document.getElementById(id).style.display = 'none';
//       console.log('Yay it works!');
//       onCompletion();
//       // setMatchingCounter((prevCounter) => prevCounter + 1);
//       // console.log(`${matchingCounter}`);
//     } else {
//       console.log('try again')
//     }

//     event.target.classList.remove('over');
//   };

//   // console log to check selectedId and dropTargetId
//   useEffect(() => {
//     // console.log(selectedId)
//     console.log(dropTargetId)
//   }, [dropTargetId, dropTargetId]);


//   useEffect(() => {
//     // addEventListeners();
//     const draggableListItems = document.querySelectorAll('.draggableItem');

//     draggableListItems.forEach((item) => {
//       item.addEventListener('dragstart', dragStart);
//       item.addEventListener('dragenter', dragEnter);
//       item.addEventListener('drop', dragDrop);
//       item.addEventListener('dragover', dragOver);
//       item.addEventListener('dragleave', dragLeave);
//     });

//     return () => {
//       // removeEventListeners();
//         const draggableListItems = document.querySelectorAll('.draggableItem');

//       draggableListItems.forEach((item) => {
//         item.removeEventListener('dragstart', dragStart);
//         item.removeEventListener('dragenter', dragEnter);
//         item.removeEventListener('drop', dragDrop);
//         item.removeEventListener('dragover', dragOver);
//         item.removeEventListener('dragleave', dragLeave);
//       });
//     };
//   }, []);

//   // console.log('answerList', answerList)
//   // console.log('questionList', questionList)
//   // console.log('completedAnswers', completedAnswers)
//   // console.log('completedQuestions', completedQuestions)

//   const onCompletion = () => {
//     const copyAnswerList = [...answerList];
//     const copyQuestionList = [...questionList];

//     const oldAnswerArray = answerList.filter(x => x.id != startId);
//     console.log('oldAnswerArray', oldAnswerArray);
//     const newAnswerArray = answerList.filter(x => x.id == startId);
//     console.log('newAnswerArray', newAnswerArray);

//     const oldQuestionArray = questionList.filter(x => x.id != startId);
//     // console.log('oldQuestionArray', oldQuestionArray);
//     const newQuestionArray = questionList.filter(x => x.id == startId);
//     // console.log('newQuestionArray', newQuestionArray);

//     questionList = oldQuestionArray;
//     answerList = oldAnswerArray;
//     setCompletedAnswers((completedAnswers) => ([...completedAnswers, newAnswerArray[0]]));
//     setCompletedQuestions((completedQuestions) => ([...completedQuestions, newQuestionArray[0]]));
//   }

//   console.log('questionList', questionList);
//   console.log('answerList', answerList);

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={6}>
//         <Paper>
//           <h3>Questions:</h3>
//           {questionList?.map((question, id) => (
//             <p className="questionList draggableItem" key={id} draggable="true" id={question.id}>
//               {question.q}
//             </p>
//           ))}
//         </Paper>
//       </Grid>
//       <Grid item xs={6}>
//         <Paper>
//           <h3>Answers:</h3>
//           {answerList?.map((answer, id) => (
//             <p className="answerList draggableItem" key={id} draggable="true" id={answer.id}>
//               {answer.a}
//             </p>
//           ))}
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

// export default DragCard;



import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper } from '@mui/material';

function DragCard() {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [matchingCounter, setMatchingCounter] = useState(0);
  const [hiddenElements, setHiddenElements] = useState([]);
  const [triumphMessage, setTriumphMessage] = useState(false);
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
  };

  useEffect(() => {
    console.log(selectedId);
    console.log(dropTargetId);
  }, [selectedId, dropTargetId]);


  //by using a useEffect we solve our issue of state not being updated when the if then statement is called to check for equality of selectedId and dropTargetId
  useEffect(() => {
    // if the id of the selected element equals the id of the target element, we continue with our function.
    if (selectedId === dropTargetId) {
      console.log('Yay it works!');
      const selectedElement = document.getElementById(selectedId);
      const dropTargetElement = document.getElementById(dropTargetId);
    

      // this is a null check, so if these variables are not assigned values, the if then statement will not run.
      if (selectedElement && dropTargetElement) {
        // selectedElement.style.display = 'none';
        selectedElement.style.display = 'none';

        // Find matching answer element with the same ID value and set its display to 'none'
        const matchingAnswerElement = document.querySelector(
          `.answerList.draggableItem[id="${selectedId}"]`
        );

        // same here - if matchingAnswerElement is not assigned a value, the statement will not run. This prevents the error: Cannot read properties of null (reading 'style')
        if (matchingAnswerElement) {
          matchingAnswerElement.style.display = 'none';
        }
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
  }, [selectedId, dropTargetId]);

  useEffect(() => {
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
  }, []);


  useEffect(() => {
    // Check if all elements are hidden
    const allHidden = questionList.every((question) => {
      const questionElement = document.getElementById(question.id);
      return questionElement.style.display === 'none';
    }) && answerList.every((answer) => {
      const answerElement = document.getElementById(answer.id);
      return answerElement.style.display === 'none';
    });
  
    if (allHidden) {
      setAllHidden(true);
      console.log('All elements are hidden');
    }
  }, [selectedId, dropTargetId]);
  


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
            <h3>Questions 777:</h3>
            {questionList.map((question, id) => (
              <p className="questionList draggableItem"
                key={id}
                draggable="true"
                id={question.id}>
                {question.q}
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <h3>Answers:</h3>
            {answerList.map((answer, id) => (
              <p className="answerList draggableItem"
                key={id}
                draggable="true"
                id={answer.id}>
                {answer.a}
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <Grid container justifyContent="center"> {/* Center the winMessage horizontally */}
          {allHidden && <p className='winMessage'>You win!</p>}
        </Grid>
      </Grid>

      </Grid>
  );
}

export default DragCard;