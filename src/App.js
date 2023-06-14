import React, { useState, useEffect } from 'react';
import './App.css';
import DragCard from './DragCard';
import { v4 } from "uuid";
// import DragCardParent from './DragCardParent';
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
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
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

      // let shuffledQs = [];
      // let shuffledAs = [];

      // maps information from firebase, allows for questions to have images or not
      studyset.map((x) => {
        const question = { q: x.question, id: v4(), name: x.id };
        const correctAnswer = { a: x.correctAnswerList[0].answer, id: v4(), name: x.id };

        if (x.questionImage && x.questionImage[0] && x.questionImage[0].url) {
          question.qImage = x.questionImage[0].url;
        }

        qs.push(question);
        as.push(correctAnswer);

        // deep clone of qs and as to shuffle
        // shuffledAs = [...as];
        // shuffledQs = [...qs];

        // slice of state unshuffled
        setQuestions(qs);
        setAnswers(as);

      });

      // shuffle question and answer elements for matching game
      const shuffleArray = (arr) => {
        arr.sort(() => Math.random() - 0.5);
      }

      // deep clone of initial array to be shuffled
      let shuffledAs = [...as];
      let shuffledQs = [...qs];

      shuffleArray(shuffledAs);
      shuffleArray(shuffledQs);

      // setQuestions(qs);
      // setAnswers(as);

      setShuffledQuestions(shuffledQs);
      setShuffledAnswers(shuffledAs);



      // const shuffledQuestions = shuffleArray(questions);
      // const shuffledAnswers = shuffleArray(answers);

      // setShuffledQuestions(shuffledQuestions);
      // setShuffledAnswers(shuffledAnswers);

    }
  }, [studyset])

  return (
    <div className="App">
      {/* <DragCard answers={answers} questions={questions} /> */}
      <DragCard
        answers={shuffledAnswers}
        questions={shuffledQuestions}
        resultsQuestions={questions}
        resultsAnswers={answers}
      />
      {/* <DragCardParent /> */}
    </div>
  );
}

export default App;
