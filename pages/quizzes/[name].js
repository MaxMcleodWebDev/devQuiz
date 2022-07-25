import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import RenderQuiz from '../../components/RenderQuiz'

// export async function getServerSideProps({ params }) {

// const router = useRouter()

//   const { data: questions, error } = await supabase
//   .from('questions')
//   .select('*')
//   .eq('subject', router.pathname)

//   if (error) {
//     console.log(error.message)
//   }

//   return {
//     props: {
//       questions
//     }
//   }
// }

export default function Quiz() {
  // const [selectedQuestions, setSelectedQuestions] = useState([])
  // const [remianingQuestions, setRemianingQuestions] = useState([])

  const router = useRouter()
  let selectedQuestions = []

  // useEffect(() => {

  //   getData()

  //   // return selectedQuestions
  // }, [])

  async function getData() {

    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .eq('subject', router.query.name)

    if (error) {
      console.log(error.message)
    }

    // setRemianingQuestions(remianingQuestions.push(...questions))
    let remianingQuestions = [...questions]
    console.log(remianingQuestions);

    for (let i = 0; i < 10; i++) {
      // Generate random index
      let randomIndex = Math.floor(Math.random() * remianingQuestions.length)
      // Add question to selected questions array
      selectedQuestions.push(remianingQuestions[randomIndex])
      // Remove question from remaining questions array to avoid duplication
      remianingQuestions.splice(randomIndex, 1)
    }
  }


  // console.log(remianingQuestions);
  // console.log(selectedQuestions);

  // console.log(router.pathname)
  // console.log(router.query)
  // console.log(router.asPath)

  return (
    <div>
      {/* <button onClick={getData}>Render Quiz</button> */}
      <RenderQuiz selectedQuestions={selectedQuestions} getData={getData} />
    </div>
  )
}
