import React from "react";
import { useState } from "react";
import { selectedQuestions } from "../utils/questionsArray";

export default function RenderQuiz() {
	const [questionIndex, setQuestionIndex] = useState(1);
	const [answerIndex, setAnswerIndex] = useState(1);
	const [score, setScore] = useState(0);

	const [quizState, setQuizState] = useState(false)

	const nextQuestion = () => {
		if (questionIndex !== selectedQuestions.length) {
			setQuestionIndex(questionIndex + 1);
			setAnswerIndex(answerIndex + 1);
		} else if (quizState == false){
			setQuizState((prevState) => !prevState)
			document.getElementById('trueButton').disable = true;
		}
	};

	const answerSubmit = (e) => {
		if (e.target.textContent == "True Value") {
			if (quizState === true) {
				console.log("Thanks for playing!");
			} else {
				setScore(score + 1);
				nextQuestion()
			}
		} else {
			nextQuestion();
		}
	};	

	return (
		<div className="container-question text-center">
			<p className="m-3 mt-20 text-center">{`Question ${questionIndex} of 10`}</p>
			<p className="mt-5">Current score: {score}/10</p>
			<div className="relative">
				{Array.from(selectedQuestions).map((q, i) => {
					return (
						<div className="text-center">
							<div key={i} className={questionIndex === i + 1 ? "question active-question" : "question"}>
								<h2 className="mt-16">
									{q.question}
								</h2>
							</div>
							<div key={i} className={answerIndex === i + 1 ? "question active-question" : "question"}>
								<h2 className="blur hover:blur-none mt-16 answer-container m-auto" key={i}>
									<p>{q.answer}</p>
								</h2>
							</div>
						</div>
					);
				})}
			</div>
			<div className="mt-40">
				<button id="trueButton" className="px-3" value={true} onClick={answerSubmit}>
					True Value
				</button>
				<button id="falseButton" className="px-3" value={false} onClick={answerSubmit}>
					False Value
				</button>
			</div>
		</div>
	);
}
