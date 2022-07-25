import React from "react";
import { useState } from "react";
// import { selectedQuestions } from "../utils/questionsArray";

export default function RenderQuiz({ selectedQuestions, getData }) {

	// console.log(selectedQuestions)

	const [questionIndex, setQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [quizState, setQuizState] = useState(false)

	const quizStart = async () => {
		const quizContainer = document.getElementById('quiz-container')
		const startButton = document.getElementById('start-btn')

		await getData()

		startButton.classList.add('hidden')
		quizContainer.classList.remove('hidden')

		nextQuestion()
	}

	const nextQuestion = () => {
		resetState()

		if (questionIndex !== selectedQuestions.length) {
			setQuestionIndex(questionIndex + 1)
		}

		showQuestion()
	}

	const showQuestion = () => {
		const questionTitle = document.getElementById('question-title')
		const buttonContainer = document.getElementById('btn-container')

		questionTitle.innerText = selectedQuestions[questionIndex].question

		selectedQuestions[questionIndex].answers.forEach(answer => {
			const button = document.createElement('button')

			button.innerText = answer.answer
			button.classList.add('btn')

			if (answer.value) {
				button.value = answer.value
			}

			button.addEventListener('click', selectAnswer)
			buttonContainer.appendChild(button)
		})

		if (questionIndex + 1 == 10) {
			setQuizState((prevState) => !prevState)
			document.getElementById('next-btn').classList.add('hidden')
		}
	}

	const resetState = () => {
		const buttonContainer = document.getElementById('btn-container')
		const nextButton = document.getElementById('next-btn')

		nextButton.classList.add('hidden')

		while (buttonContainer.firstChild) {
			buttonContainer.removeChild(buttonContainer.firstChild)
		}
	}

	const fullReset = () => {
		document.getElementById('quiz-container').classList.add('hidden')
		document.getElementById('end-quiz-btn').classList.add('hidden')
		document.getElementById('end-quiz').classList.remove('hidden')
	}

	const selectAnswer = (e) => {
		const nextBtn = document.getElementById('next-btn')
		const btns = document.getElementById('btn-container').children

		if (e.target.value) {
			console.log('I am the right answer')
			setScore(score + 1)
		} else {
			console.log('I am not the right answer')
		}

		for (let i = 0; i < btns.length; i++) {
			btns[i].disabled = true;
		}

		if (questionIndex + 1 < 10) {
			nextBtn.classList.remove('hidden')
		} else {
			document.getElementById('end-quiz-btn').classList.remove('hidden')
		}
	}

	return (
		<div className="container-question">
			<button id='start-btn' onClick={() => quizStart()}>Start</button>
			<div id='quiz-container' className=" text-center hidden">
				<p className="m-3 mt-20 text-center">{`Question ${questionIndex} of 10`}</p>
				<div className="relative">
					<div className="text-center">
						<div>
							<h2 id="question-title" className="mt-5">
								Question Title
							</h2>
						</div>
						<div id='btn-container' className="mt-16 grid grid-cols-2 m-auto gap-4">
						</div>
					</div>
				</div>
				<div className="mt-20">
					<button id="next-btn" className="px-3" onClick={nextQuestion}>
						Next Question
					</button>
					<button id="end-quiz-btn" className="hidden" onClick={fullReset}>
						Finish Quiz
					</button>
				</div>
			</div>
			<div id="end-quiz" className="hidden">
				<p>{score == 10 ? `Excellent job, your score was ${score}/10! You got every question right! :)` : score >= 7 ? `Very well done, your socre was ${score}/10. Keep it up!` : score >= 5 ? `Your score was ${score}/10. Doing good, keep practicing! :)` : `Your score was ${score}/10. Don't feel discouraged, you can do better! :)`}</p>
				<a href="/">
					<button>
						Retry Quiz
					</button>
				</a>
			</div>
		</div>
	);
}