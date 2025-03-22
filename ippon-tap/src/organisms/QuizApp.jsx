import React, { useState } from 'react';
import TopicDisplay from '../molecules/TopicDisplay';
import Button from '../atoms/Button';
import './QuizApp.css';
import {topics} from "./QuizText"


const QuizApp = () => {
  const [currentTopic, setCurrentTopic] = useState(getRandomTopic());

  function getRandomTopic() {
    const randomIndex = Math.floor(Math.random() * topics.length);
    return topics[randomIndex];
  }

  const handleChangeTopic = () => {
    let newTopic = getRandomTopic();
    // 現在のお題と重ならないようにする（お題が複数ある場合）
    while(newTopic === currentTopic && topics.length > 1) {
      newTopic = getRandomTopic();
    }
    setCurrentTopic(newTopic);
  };

  return (
    <div className="quiz-app">
      <h1>お題</h1>
      <TopicDisplay topic={currentTopic} />
      <Button onClick={handleChangeTopic}>他のお題に変える</Button>
    </div>
  );
};

export default QuizApp;
