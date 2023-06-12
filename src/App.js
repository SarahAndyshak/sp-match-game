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
      const studysetRef = doc(db, 'sets', '2hIITNZFinxhpiCttxgL');

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
      studyset.map((x) => {
        qs.push({q: x.question, id:x.id});
        as.push({a: x.correctAnswerList[0].answer, id:x.id})
      })

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
