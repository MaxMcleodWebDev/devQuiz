import React from "react";
import { useState } from "react"
import questionToRender from "../utils/questionsArray";
import { questionData } from "../data/questionData";
import { selectedQuestions } from "../utils/questionsArray";

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
			<div className="answer-container">
				{Array.from(selectedQuestions).map((q, i) => {
					<p>
						{q.answers[0].answer}
					</p>
				})}
			</div>
		</div>
    );
}
