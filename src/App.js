import React, { useState, useEffect } from 'react';
import './App.css';
import DragCard from './DragCard';
import DragCardParent from './DragCardParent';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from './firebase';

function App() {
  const [studyset, setStudyset] = useState([]);
  console.log('studyset', studyset)
  useEffect(() => {
    getStudySet();
  }, [])

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  console.log('answers', answers)
  console.log('questions', questions)


  const getStudySet = async () => {
    try {
      const studysetRef = doc(db, 'sets', 'Gv9UBUTE25vsvZzCjgUD');

      onSnapshot(studysetRef, (doc) => {
        setStudyset(doc.data().cards)
      })

    } catch (error) {
      console.log('Error getting single study set', error);
    }
  }

  useEffect(() => {
    if (studyset) {
      // initiate question array
      let qs = [];
      // initiate answer array
      let as = [];

      // maps information from firebase to be mapped, allows for questions to have images or not
      studyset.map((x) => {
        const question = { q: x.question, id: x.id };
        const correctAnswer = { a: x.correctAnswerList[0].answer, id: x.id };
  
        if (x.questionImage && x.questionImage[0] && x.questionImage[0].url) {
          question.qImage = x.questionImage[0].url;
        }
  
        qs.push(question);
        as.push(correctAnswer);
      });

      // shuffle question and answer elements for matching game
      const shuffleArray = (arr) => {
        arr.sort(() => Math.random() - 0.5);
      }
      shuffleArray(qs);
      shuffleArray(as);

      setQuestions(qs);
      setAnswers(as);
    }
  }, [studyset])

  return (
    <div className="App">
      <DragCard answers={answers} questions={questions} />
      {/* <DragCardParent /> */}
    </div>
  );
}

export default App;
