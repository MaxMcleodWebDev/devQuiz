import React from "react";
import { useState } from "react"
import questionToRender from "../utils/questionsArray";
import { questionData } from "../data/questionData";

export default function test() {

	let remianingQuestions = [...questionData]
	let selectedQuestions = []
	let selectedAnswers = []

	const createQuiz = () => {
    	for(let i = 0; i < 10; i++){
			// Generate random index
       		let randomIndex = Math.floor(Math.random() * remianingQuestions.length)
			// Add question to selected questions array
			selectedQuestions.push(remianingQuestions[randomIndex])
			// Add answers to selected answers array
			selectedAnswers.push(remianingQuestions[randomIndex])
			// Remove question from remaining questions array to avoid duplication
        	remianingQuestions.splice(randomIndex, 1)
    	}
	}

	createQuiz();

	let remianingIndexes = []
	let selectedIndexes = []
	//Selected indexes only and add to remaining indexes array
	questionData.map((q, i) => {remianingIndexes.push(i)})

	const createSecondQuiz = () => {
		for(let i = 0; i < 10; i++){
			let randomIndex = Math.floor(Math.random() * remianingIndexes.length)

			selectedIndexes.push(remianingIndexes[randomIndex])

			remianingIndexes.splice(randomIndex, 1)
		}
	}

	createSecondQuiz()

	console.log(selectedIndexes)





	// const [questionIndex, setQuestionIndex] = useState(1)

	// const nextQuestion = () => {
	// 	if(questionIndex !== quizArray.length){
	// 		setQuestionIndex(questionIndex + 1)
	// 	}
	// }

	return (
		<div className="container-question">
			{/* {Array.from(quizArray).map((q, i) => {
				return (
					<div key={i} className={questionIndex === i + 1 ? "question active-question flex justify-center" : "question"}>
						<h2>{q.question}</h2>
						<button className="block m-40" onClick={nextQuestion}>Next Question</button>
					</div>
				)
			})} */}
		</div>
    );
}
