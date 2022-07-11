import { questionData } from "../data/questionData";

let remianingQuestions = [...questionData]
let selectedQuestions = []

const createQuiz = () => {
	for(let i = 0; i < 10; i++){
		// Generate random index
		   let randomIndex = Math.floor(Math.random() * remianingQuestions.length)
		// Add question to selected questions array
		selectedQuestions.push(remianingQuestions[randomIndex])
		// Remove question from remaining questions array to avoid duplication
		remianingQuestions.splice(randomIndex, 1)
	}
}

createQuiz();

export { selectedQuestions }
