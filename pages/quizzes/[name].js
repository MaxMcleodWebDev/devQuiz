import React from 'react'
import { supabase } from '../../utils/supabaseClient'
import RenderQuiz from '../../components/RenderQuiz'
import Navbar from '../../components/Navbar'

export async function getServerSideProps({ params }) {

  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('subject', params.name)

  if (error) {
    console.log(error.message)
  }

  let selectedQuestions = []
  let remianingQuestions = [...questions]

  for (let i = 0; i < 10; i++) {
    // Generate random index
    let randomIndex = Math.floor(Math.random() * remianingQuestions.length)
    // Add question to selected questions array
    selectedQuestions.push(remianingQuestions[randomIndex])
    // Remove question from remaining questions array to avoid duplication
    remianingQuestions.splice(randomIndex, 1)
  }

  return {
    props: {
      selectedQuestions
    }
  }
}

export default function Quiz({ selectedQuestions }) {

  return (
    <div>
      <Navbar />
      <RenderQuiz selectedQuestions={selectedQuestions} />
    </div>
  )
}
