import React from "react";
import { useState, useEffect } from "react";
import { selectedQuestions } from "../utils/questionsArray";

export default function RenderQuiz() {

	console.log(selectedQuestions[0].answers);

	const [questionIndex, setQuestionIndex] = useState(0);
	const [answerIndex, setAnswerIndex] = useState(0);
	const [score, setScore] = useState(0);

	const [quizState, setQuizState] = useState(false)

	const quizStart = () => {
		const quizContainer = document.getElementById('quiz-container')
		const startButton = document.getElementById('start-btn')
		startButton.classList.add('hidden')
		quizContainer.classList.remove('hidden')
		setNextQuestion()
	}

	const setNextQuestion = () => {
		resetState()
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
				button.dataset.value = answer.value
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
		console.log('I am button!')
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
					<button id="next-btn" className="px-3">
						Next Question
					</button>
				</div>
			</div>
		</div>
	);
}
