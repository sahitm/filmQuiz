import React from 'react'


function Home({setQuiz,quiz}) {

    function handleChange(){
        setQuiz(!quiz)
    }

    return ( 
        <div className='flex flex-col justify-center text-center bg-blue-100  h-screen'>
            <h1 className='font-bold text-4xl text-gray-800'>Quizzical</h1>
            <p>Test you film knowledge</p>
            <button 
            className='my-12 bg-indigo-900 mx-auto text-blue-200 rounded-lg py-2 px-4' 
            onClick={handleChange}
            >
                Start Quiz
            </button>
        </div>
     )
}

export default Home;