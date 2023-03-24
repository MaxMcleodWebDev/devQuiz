import React from 'react'
import { useState } from 'react'
import NavButton from '../../../components/NavButton'
import { supabase } from '../../../utils/supabaseClient'

export async function getServerSideProps({ params }) {
    const { data: question, error } = await supabase
        .from('questions')
        .select('*')
        .eq('id', params.id)

    if (error) {
        console.log(error.message)
    }

    return {
        props: {
            question
        }
    }
}

export default function editQuestion({ question }) {

    console.log(question);

    const [questionAnswers, setQuestionAnswers] = useState([])
    question = question[0]

    const addQuestion = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.target)

        const myData = Object.fromEntries(formData)

        console.log(myData);

        for (let i = 0; i < e.target.length; i++) {
            if (i !== 0 && i !== 1) {
                if (e.target[i].value !== '') {
                    setQuestionAnswers(questionAnswers.push({ answer: e.target[i].value, value: Boolean(e.target[i].name) }))
                }
            }
        }

        console.log(questionAnswers)

        const { data, error } = await supabase
            .from('questions')
            .update([
                { question: myData.questionTitle, answers: questionAnswers, subject: myData.subject },
            ])
            .eq('id', question.id)

        if (error) {
            throw error

        }
    }

    return (
        <div>
            <form onSubmit={addQuestion} className='mt-20'>
                <label htmlFor="subject">Question Subject</label>
                <select className='text-black' name="subject" required >
                    <option className='test-black' value={question.subject}>{question.subject}</option>
                    <option className='text-black' value="Maths">Maths</option>
                    <option className='text-black' value="Science">Science</option>
                    <option className='text-black' value="English">English</option>
                </select>

                <label className='pt-5' htmlFor="questionTitle">Question title</label>
                <input name='questionTitle' type="text" defaultValue={question.question} />

                <label className='pt-5' htmlFor="correctAnswer">Questions Correct Answer</label>
                <input type="text" name='correctAnswer' defaultValue={question.answers[0].answer} required />

                <label className='pt-5' htmlFor="incorrectAnswers">Questions Incorrect Answers</label>
                <div className='grid grid-cols-3 gap-4'>
                    {question.answers.map((answer, i) => {
                        if (i !== 0) {
                            return (
                                <input key={i} type="text" name='' defaultValue={answer.answer} />
                            )
                        }
                    })}
                </div>

                <button className='my-5' type='submit'>Update Question</button>
            </form>
            <NavButton href='/' nav='Return to Menu' />
            <NavButton href={`/question/${question.id}`} nav='Return to Question Review' />
            <NavButton href='/question-list' nav='Return to Questions' />
        </div>
    )
}
