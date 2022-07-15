import React from "react";
import { useState, useEffect } from "react";
import { questionData } from "../data/questionData";
import { selectedQuestions } from "../utils/questionsArray";

export default function RenderQuiz({ questions }) {

	const [questionIndex, setQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [quizState, setQuizState] = useState(false)

	let remainingQuestions = [...questions]

	const quizStart = () => {
		const quizContainer = document.getElementById('quiz-container')
		const startButton = document.getElementById('start-btn')
		startButton.classList.add('hidden')
		quizContainer.classList.remove('hidden')
		createQuiz()
	}

	const createQuiz = () => {

		let selectedQuestions = []

		for (let i = 0; i < 10; i++) {
			// Generate random index
			let randomIndex = Math.floor(Math.random() * remainingQuestions.length)
			// Add question to selected questions array
			selectedQuestions.push(remainingQuestions[randomIndex])
			// Remove question from remaining questions array to avoid duplication
			remainingQuestions.splice(randomIndex, 1)
		}

		nextQuestion(selectedQuestions)
	}

	const nextQuestion = (question) => {

		resetState()
		if (questionIndex !== question.length) {
			setQuestionIndex(questionIndex + 1)
		} else if (quizState == false) {
			console.log('hello');
			setQuizState((prevState) => !prevState)
			document.getElementById('next-btn').disable = true
		}

		showQuestion(selectedQuestions[questionIndex])
	}

	const showQuestion = (question) => {
		const questionTitle = document.getElementById('question-title')
		const buttonContainer = document.getElementById('btn-container')
		questionTitle.innerText = question.question
		question.answers.forEach(answer => {
			const button = document.createElement('button')
			button.innerText = answer.answer
			button.classList.add('btn')
			if (answer.value) {
				button.value = answer.value
			}
			button.addEventListener('click', selectAnswer)
			buttonContainer.appendChild(button)
		})
	}

	const resetState = () => {
		const buttonContainer = document.getElementById('btn-container')
		const nextButton = document.getElementById('next-btn')
		nextButton.classList.add('hidden')
		while (buttonContainer.firstChild) {
			buttonContainer.removeChild(buttonContainer.firstChild)
		}
	}

	const selectAnswer = (e) => {

		const nextBtn = document.getElementById('next-btn')

		// if (e.target.value) {
		// 	if (quizState == true) {
		// 		console.log('thanks for playing')
		// 	} else {
		// 		setScore(score + 1)
		// 	}
		// } else {
		// 	console.log('Wrong answer!')
		// }

		if (e.target.value) {
			console.log('I am the right answer')
			setScore(score + 1)
		} else {
			console.log('I am not the right answer')
		}

		nextBtn.classList.remove('hidden')

	}

	// const nextQuestion = () => {
	// 	if (questionIndex !== selectedQuestions.length) {
	// 		setQuestionIndex(questionIndex + 1);
	// 		setAnswerIndex(answerIndex + 1);
	// 	} else if (quizState == false) {
	// 		setQuizState((prevState) => !prevState)
	// 		document.getElementById('trueButton').disable = true;
	// 	}
	// };

	// const answerSubmit = (e) => {
	// 	if (e.target.textContent == "True Value") {
	// 		if (quizState === true) {
	// 			console.log("Thanks for playing!");
	// 		} else {
	// 			setScore(score + 1);
	// 			nextQuestion()
	// 		}
	// 	} else {
	// 		nextQuestion();
	// 	}
	// };

	return (
		<div className="container-question">
			<button id='start-btn' onClick={() => quizStart()}>Start</button>
			<div id='quiz-container' className=" text-center hidden">
				<p className="m-3 mt-20 text-center">{`Question ${questionIndex} of 10`}</p>
				<p className="mt-5">Current score: {score}/10</p>
				<div className="relative">
					<div className="text-center">
						<div>
							<h2 id="question-title" className="mt-5">
								Question Title
							</h2>
						</div>
						<div id='btn-container' className="mt-16 grid grid-cols-2 m-auto">
						</div>
					</div>
				</div>
				<div className="mt-40">
					<button id="next-btn" className="px-3" onClick={(e) => nextQuestion(e)}>
						Next Question
					</button>
				</div>
			</div>
		</div>
	);
}