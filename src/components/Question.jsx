import React from "react"

function Question({Key,question,options,selectAnswer,isCheck,id,selectedIndex,correct_answer_index}) {

    const selectedButtonStyle = {
        backgroundColor: "#3850D4",
        border: "1px solid transparent",
        color: "black"
    }

    const unselectedButtonStyle = {
        backgroundColor: "#7483D1",
    }

    const wrongButtonStyle = {
        backgroundColor: "#F8BCBC",
        border: "1px solid transparent",
        opacity: "0.8",
        color: "black"
    }
    
    const correctButtonStyle = {
        backgroundColor: "#94D7A2",
        border: "1px solid transparent",
        color: "black"
    }

    function getStyle(index){
        if(isCheck){
            if(correct_answer_index === index){
                return correctButtonStyle
            }else if(selectedIndex === index && correct_answer_index !== index){
                return wrongButtonStyle
            }
        }else{
            if(selectedIndex === index){
                return selectedButtonStyle
            }else{
                return unselectedButtonStyle
            }
        }


    }

    function getButtonElement(index){
        return (
            <button     
            className="border-gray-800 border-1 text-indigo-100 mr-6 py-0.5 px-2 rounded-lg font-mono" 
            onClick={() => {selectAnswer(id,index)}} 
            style={getStyle(index)}
            >
            {options[index]}
            </button>
        )
    }

    return ( 
        <div>
            
            <div> 
                <h1 className="font-bold">{question}</h1>
            </div>
            <div className="mt-6 flex ml-6">
                {getButtonElement(0)}
                {getButtonElement(1)}
                {getButtonElement(2)}
                {getButtonElement(3)}
            </div>
            <hr className="mt-4 border-gray-400 " />
        </div>
     )
}

export default Question