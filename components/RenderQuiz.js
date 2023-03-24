import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { supabase } from "../utils/supabaseClient";
import NavButton from "./NavButton";
import Carousel from "./Carousel/Carousel";


export default function RenderQuiz({ selectedQuestions, session }) {


	useEffect(() => {
		getProfile()
	}, [session])

	async function getProfile() {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`*`)
				.eq('id', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUsername(data.username)
			}
		} catch (error) {
			console.log(error.message)
		} finally {
			setLoading(false)
		}
	}

	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState()
	const [questionIndex, setQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [resultDetails, setResultDetails] = useState([])

	const router = useRouter()
	const user = supabase.auth.user()

	const quizStart = () => {
		const quizContainer = document.getElementById('quiz-container')
		const startButton = document.getElementById('start-btn')

		startButton.classList.add('hidden')
		quizContainer.classList.remove('hidden')

		nextQuestion()
	}

	const nextQuestion = () => {
		resetState()

		setQuestionIndex(questionIndex + 1)

		showQuestion()
	}

	const showQuestion = () => {
		const questionTitle = document.getElementById('question-title')
		const buttonContainer = document.getElementById('btn-container')

		questionTitle.innerText = selectedQuestions[questionIndex].question

		for (let i = 0; i < selectedQuestions[questionIndex].answers.length; i++) {
			let tempAnswer = selectedQuestions[questionIndex].answers[i]
			let randomIndex = Math.floor(Math.random() * selectedQuestions[questionIndex].answers.length)

			selectedQuestions[questionIndex].answers[i] = selectedQuestions[questionIndex].answers[randomIndex]
			selectedQuestions[questionIndex].answers[randomIndex] = tempAnswer
		}

		selectedQuestions[questionIndex].answers.map((answer, i) => {
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

	const fullReset = async () => {
		document.getElementById('quiz-panel').classList.remove('flex')
		document.getElementById('quiz-panel').classList.add('hidden')
		document.getElementById('end-quiz-btn').classList.add('hidden')
		document.getElementById('post-quiz').classList.remove('hidden')

		const { data, error } = await supabase
			.from('results')
			.insert([{ score: score, subject: router.query.name, user: user.id, username: username, results_details: resultDetails }])

		if (error) {
			console.log(error)
		}
	}

	const selectAnswer = (e) => {
		const nextBtn = document.getElementById('next-btn')
		const btns = document.getElementById('btn-container').children

		for (let i = 0; i < btns.length; i++) {
			btns[i].disabled = true;
			btns[i].classList.add('duration-700', 'bg-neutral-800', 'text-neutral-500')
		}

		if (e.target.value) {
			e.srcElement.classList.remove('bg-neutral-800')
			e.srcElement.classList.add('bg-lime-500', 'text-neutral-50')
			setScore(score + 1)
		} else {
			e.srcElement.classList.remove('bg-neutral-800')
			e.srcElement.classList.add('bg-red-600', 'text-neutral-50')
		}

		setResultDetails(resultDetails => [...resultDetails, { questionTitle: selectedQuestions[questionIndex].question, answer: e.target.innerText, result: Boolean(e.target.value), id: selectedQuestions[questionIndex].id }])

		if (questionIndex + 1 < 10) {
			nextBtn.classList.remove('hidden')
		} else {
			document.getElementById('end-quiz-btn').classList.remove('hidden')
		}

	}

	return (
		<div>
			<div id='quiz-panel' className="flex justify-center items-center h-[500px] p-10">
				<button id='start-btn' className='bg-gradient-to-r from-cyan-500 to-blue-500' onClick={() => quizStart()}>Start</button>
				<div id='quiz-container' className="text-center w-[500px] hidden">
					<p className="m-3 text-center">{`Question ${questionIndex} of 10`}</p>
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
					<div className="absolute left-0 right-0 mt-20">
						<button id="next-btn" className="px-3" onClick={nextQuestion}>
							Next Question
						</button>
						<button id="end-quiz-btn" className="hidden" onClick={fullReset}>
							Finish Quiz
						</button>
					</div>
				</div>
			</div>
			<div id="post-quiz" className="hidden">
				<div className="flex w-full flex-1 flex-col items-center justify-center mt-20 px-20 text-center">
					<div className="mb-10 flex flex-col  justify-center space-y-6">
						<h1 className="text-4xl font-bold md:text-5xl">Quiz Results</h1>
						<h1 className='iniline font-extrabold text-5xl bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text'>{score}/10.</h1>
						<p className="text-center text-xs opacity-75">{score == 10 ? `Excellent job, You got every question right!` : score >= 7 ? `Very well done, Keep it up!` : score >= 5 ? `Doing good, keep practicing!` : `Don't feel discouraged, you can do better!`}</p>
					</div>
				<Carousel resultDetails={resultDetails}/>
				<NavButton href={`/quizzes/${router.query.name}`} nav='retry quiz' />
				<NavButton href='/' nav='return to menu' />
      			</div>
			</div>
		</div>
	);
}