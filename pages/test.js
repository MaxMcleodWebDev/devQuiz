import React from "react";
import { useState } from "react"
import questionToRender from "../utils/questionsArray";

export default function test() {

	const [questionIndex, setQuestionIndex] = useState(1)

	const nextQuestion = () => {
		if(questionIndex !== questionToRender.length){
			setQuestionIndex(questionIndex + 1)
		}
	}

	return (
		<div className="container-question">
			{Array.from(questionToRender).map((q, i) => {
				return (
					<div key={i} className={questionIndex === i + 1 ? "question active-question flex justify-center" : "question"}>
						<h2>{q}</h2>
						<button onClick={nextQuestion}>Next Question</button>
					</div>
				)
			})}
		</div>
    );
}
