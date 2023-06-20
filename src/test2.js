// taking cards out of columns, place with randomizer

if (w > h){

return (
    <div>  
    {!allHidden && (
      <h3>Questions:</h3>
        )}

      {/* Generating cards, including image (if exists) */}
      {questions?.map((question) => (
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
              left: leftPosition(), 
              top: Math.floor(Math.random() * adjustedH)
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

    {!allHidden && (
      <h3>Answers:</h3>
        )}
      {answers?.map((answer) => (
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
            left: rightPosition(), 
            top: Math.floor(Math.random() * adjustedH)
          }}
        >
          {answer.a}
        </Paper>
      ))}

    {/* Center the winMessage horizontally */}
        {allHidden && (
        // <p className='winMessage'>You win!</p>
          <AnswerTable
            questions={resultsQuestions}
            answers={resultsAnswers}
          />
        )}
      </div>


);
} else if (h > w) {
  return (
    <div>
    {!allHidden && (
      <h3>Questions:</h3>
        )}

      {/* Generating cards, including image (if exists) */}
      {questions?.map((question) => (
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
              left: leftPosition(), 
              top: Math.floor(Math.random() * adjustedH)
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

    {!allHidden && (
      <h3>Answers:</h3>
        )}
      {answers?.map((answer) => (
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
            left: rightPosition(), 
            top: Math.floor(Math.random() * adjustedH)
          }}
        >
          {answer.a}
        </Paper>
      ))}

    {/* Center the winMessage horizontally */}
        {allHidden && (
        // <p className='winMessage'>You win!</p>
          <AnswerTable
            questions={resultsQuestions}
            answers={resultsAnswers}
          />
        )}
        

        </div> 
);
}