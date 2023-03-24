import React from 'react'
import NavButton from '../../components/NavButton'
import { supabase } from '../../utils/supabaseClient'

export async function getServerSideProps({ params }) {

    const { data: question, error } = await supabase
        .from('questions')
        .select('*')
        .eq('id', params.id)

    const { data: studentResult } = await supabase
        .from('results')
        .select('*')
        .contains('results_details', JSON.stringify([{ id: parseInt(params.id) }]))

    if (error) {
        console.log(error.message)
    }

    return {
        props: {
            question,
            studentResult
        }
    }
}

export default function Question({ question, studentResult }) {

    const currentQuestion = question[0]

    const deleteQuestion = async () => {
        const { error } = await supabase
            .from('questions')
            .delete()
            .eq('id', currentQuestion.id)

        if (error) {
            console.log(error.message)
        }

        window.location.href = '/question-list'
        window.alert('Succesfully Deleted! Press OK to Continue');
    }

    return (
        <div>
            <NavButton href={`/question/edit/${question[0].id}`} nav='Edit Question' />
            <button onClick={deleteQuestion}>Delete Question</button>
            <div>
                Subject: {currentQuestion.subject}
                <br />
                Question title: {currentQuestion.question}
                <br />
                Correct answer: {currentQuestion.answers[0].answer}
                <br />
                Date created: {currentQuestion.created_at}
                <br />
            </div>
            <div>
                {studentResult.map((res, i) => {

                    return (
                        <div className='card'>
                            {res.username}
                            <br />
                            {res.results_details.map((res, i) => {
                                console.log(res);
                                if (res.id === question[0].id) {
                                    return (
                                        `${res.result}`
                                    )
                                }
                            })}
                        </div>
                    )
                })}
            </div>
            <NavButton href='/question-list' nav='back to questions' />
        </div >
    )
}
