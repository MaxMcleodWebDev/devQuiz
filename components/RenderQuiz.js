import React from "react";
import { useState } from "react";
import { questionToRender, answersToRender } from "../utils/questionsArray";

export default function RenderQuiz() {
	const [questionIndex, setQuestionIndex] = useState(1);
	const [answerIndex, setAnswerIndex] = useState(1);
	const [score, setScore] = useState(0);

	let quizOver = false;

	const nextQuestion = () => {
		if (questionIndex !== questionToRender.length) {
			setQuestionIndex(questionIndex + 1);
			setAnswerIndex(answerIndex + 1);
		} else {
			quizOver = true;
		}
	};

	const answerSubmit = (e) => {
		if (e.target.textContent == "True Value") {
			if (quizOver === true) {
				console.log("Thanks for playing!");
			} else if (score < questionToRender.length) {
				setScore(score + 1);
			}
		} else {
			nextQuestion();
		}
		nextQuestion();
	};

	return (
		<div className="container-question">
			<p className="p-3">{`Question ${questionIndex} of 10`}</p>
			{Array.from(questionToRender).map((q, i) => {
				return (
					<div key={i} className={questionIndex === i + 1 ? "question active-question" : "question"}>
						<h2 className="py-8 text-center">{q}</h2>
					</div>
				);
			})}
			{Array.from(answersToRender).map((a, i) => {
				return (
					<div key={i} className={answerIndex === i + 1 ? "question active-question" : "question"}>
						<div className="mt-40 text-center answer-container">
							<h2 className="" key={i}>
								{a}
							</h2>
						</div>
					</div>
				);
			})}
			<button className="mt-60 block" value={true} onClick={answerSubmit}>
				True Value
			</button>
			<button className="mt-10 block" value={false} onClick={answerSubmit}>
				False Value
			</button>
		</div>
	);
}
