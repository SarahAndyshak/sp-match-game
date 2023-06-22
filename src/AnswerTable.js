import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function AnswerTable({questions, answers}) {

  return (
    <TableContainer>
      <h1>You Won!</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => window.location.reload(false)}>Play again!</Button>
      </div>
    <Table>
    <TableHead>
      <TableRow>
        <TableCell><h3>Questions</h3></TableCell>
        <TableCell><h3>Answers</h3></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions.map((question, id) => (
        <TableRow key={id}>
          <TableCell style={{textAlign: "center"}}>{question.q} 
              <br />
              {question.qImage && (
                <img src={question.qImage}
                  style={{ height: "10rem" }} />
              )}
              </TableCell>
          <TableCell style={{textAlign: "center"}}>
            {answers[id] && answers[id].a}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>
  );
}

export default AnswerTable;