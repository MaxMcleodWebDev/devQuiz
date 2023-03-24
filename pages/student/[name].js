import React from 'react'
import { supabase } from '../../utils/supabaseClient'

export async function getServerSideProps({ params }) {

    const { data: student, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.name)

    const { data: results } = await supabase
        .from('results')
        .select('*')
        .eq('user', params.name)

    if (error) {
        console.log(error.message)
    }

    return {
        props: {
            student,
            results
        }
    }
}

export default function Student({ student, results }) {

    const revealQuizDetails = (e) => {
        for (let i = 0; i < results.length; i++) {
            if (document.getElementById(`${i}`).id == e.target.name) {
                document.getElementById(`${i}`).classList.remove('hidden')
                e.target.classList.add('hidden')
            }
        }
    }

    const hideQuizDetails = (e) => {
        for (let i = 0; i < results.length; i++) {
            if (document.getElementById(`${i}`).id == e.target.name) {
                document.getElementById(`${i}`).classList.add('hidden')
                document.getElementById(`btn-${i}`).classList.remove(`hidden`)
            }
        }
    }

    console.log(results)

    return (
        <div>
            <p>{student[0].username}</p>
            <p>Latest quiz results</p>
            {results.map((result, i) => {
                return (
                    <div key={i} className='card my-5'>
                        <p>Subject: {result.subject}</p>
                        <p>Scored {result.score} out of 10</p>
                        <button id={`btn-${i}`} name={i} onClick={(e) => revealQuizDetails(e)}>See result Details</button>
                        <div id={i} className='hidden'>
                            {result.results_details.map((question, i) => {
                                return (
                                    <div key={i} className='my-5'>
                                        <p>Question {i + 1}</p>
                                        <p>{question.questionDetails}</p>
                                        <p>Student answered: {question.answer}</p>
                                        <p>{question.result == 'true' ? 'Correct' : 'Incorrect'}</p>
                                    </div>
                                )
                            })}
                            <button name={i} onClick={(e) => hideQuizDetails(e)}>Close</button>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}
