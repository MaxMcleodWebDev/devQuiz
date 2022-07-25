import { supabase } from "./supabaseClient";
import { useEffect } from 'react'
// import Router from 'next/router'

let selectedQuestions = []

async function createQuiz()  {
	// const router = Router()
	
	let { data: questions, error } = await supabase
	.from('questions')
	.select('*')
	.eq('subject', 'Maths')

	// console.log(questions)

	if (error) {
		throw error;
	}

	let remianingQuestions = [...questions]

	for(let i = 0; i < 10; i++){
		// Generate random index
		   let randomIndex = Math.floor(Math.random() * remianingQuestions.length)
		// Add question to selected questions array
		selectedQuestions.push(remianingQuestions[randomIndex])
		// Remove question from remaining questions array to avoid duplication
		remianingQuestions.splice(randomIndex, 1)
	}
}

// console.log(selectedQuestions);

createQuiz();

// export { selectedQuestions }