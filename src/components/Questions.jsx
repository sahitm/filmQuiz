import React, { useEffect, useState } from "react"
import {nanoid} from "nanoid"
import {decode} from "he"
import Question from "./Question"


function Questions(props) {

    const [allQuestions,setAllQuestions] = useState([])
    const [isCheck,setIsCheck] = useState(false)
    const [handleRestart, setHandleRestart] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results.map(item => {
                return{
                    id:nanoid(),
                    question: decode(item.question),
                    correct_answer: decode(item.correct_answer),
                    options: shuffle(decodeArray([item.correct_answer, ...item.incorrect_answers])),
                    selectedIndex: -1,
                    attempted : -1
                }
            })))

    },[handleRestart])

    function selectAnswer(id,index){
        if(!isCheck){
            setAllQuestions(prev => prev.map(item => {
                return item.id === id ?
                {...item,selectedIndex:index,attempted:1}:
                item
            }))
        }
    }

    function decodeArray(array) {
        return array.map((item) => decode(item))
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function getScore() {
        let score = 0
        for (const item of allQuestions) {
            if (item.selectedIndex === item.options.indexOf(item.correct_answer)) {
                score++
            }
        }
        return score
    }

    function attemptedAll(){

        let attemtNumber = 0
        for(const item of allQuestions){
            if(item.attempted === 1){
                attemtNumber++
            }
        }
        if(attemtNumber>4){
            setIsCheck(true)
        }else{
            alert("attempt all the questions")
        }
    }

    function restartGame() {
        setAllQuestions([])
        setHandleRestart(prev => !prev)
        setIsCheck(false)  
    }

    const QuestionElements = allQuestions.map(question => (
        <Question 
            key={question.id}
            id={question.id}
            question={question.question}   
            options={question.options}
            selectAnswer={selectAnswer}
            isCheck={isCheck}
            selectedIndex={question.selectedIndex}
            correct_answer_index={question.options.indexOf(question.correct_answer)}
        />
    ))

    return ( 
        // <div className="h-screen flex flex-col justify-evenly ml-6" ></div>
           
        <div className="h-screen flex flex-col justify-evenly ml-6">
            <div>{QuestionElements}</div>
            <div className="text-center">
                {isCheck && <p className="font-bold">You scored {getScore()}/5 correct answers</p>}
                {!isCheck && <button className=" border-1 text-indigo-100 py-0.5 px-2 rounded-lg font-mono bg-slate-800 mt-4 "  onClick={() => attemptedAll()}>Check answers</button>}
                {isCheck && <button className="border-1 text-indigo-100 py-0.5 px-2 rounded-lg font-mono bg-slate-800 mt-4" onClick={restartGame}>Play again</button>}
            </div>
        </div>
        
     )
}

export default Questions;