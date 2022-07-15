import React from 'react'
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'

export default function CreateQuestion() {

    const [questionTitle, setQuestionTitle] = useState("")
    const [questionAnswers, setQuestionAnswers] = useState([])
    const [questionSubject, setQuestionSubject] = useState("")

    const addQuestion = async (e) => {

        e.preventDefault()

        for (let i = 0; i < e.target.length; i++) {
            if (i !== 0 && i !== 1) {
                if (e.target[i].value !== '') {
                    setQuestionAnswers(questionAnswers.push({ answer: e.target[i].value, value: Boolean(e.target[i].name) }))
                }
            }
        }

        const { data, error } = await supabase
            .from('questions')
            .insert([
                { question: questionTitle, answers: questionAnswers, subject: questionSubject },
            ])

        if (error) {
            throw error
        }

        return {
            questionTitle,
            questionAnswers,
            data
        }
    }

    const test = (e) => {
        e.preventDefault()

        for (let i = 0; i < e.target.length; i++) {
            if (i !== 0 && i !== 1) {
                if (e.target[i].value !== '') {
                    setQuestionAnswers(questionAnswers.push({ answer: e.target[i].value, value: Boolean(e.target[i].name) }))
                }
            }
        }

        console.log(questionAnswers);
    }

    return (
        <div>
            <form onSubmit={(e) => test(e)} className='container mt-20'>
                <label htmlFor="subjects">Select the Questions Subject</label>
                <select className='text-black' id="subjects" defaultValue="1" required onChange={(e) => setQuestionSubject(e.target.value)}>
                    <option className='test-black' value="1" disabled={true}>Select Subject</option>
                    <option className='text-black' value="Maths">Maths</option>
                    <option className='text-black' value="Science">Science</option>
                    <option className='text-black' value="English">English</option>
                </select>
                <label className='pt-5' htmlFor="questionTitle">Enter a Question</label>
                <input id='questionTitle' type="text" onChange={(e) => setQuestionTitle(e.target.value)} value={questionTitle} />
                <label className='pt-5' htmlFor="correctAnswer">Input the Correct Answer</label>
                <input id='correctAnswer' type="text" name='true' required />
                <label className='pt-5' htmlFor="incorrectAnswers">Input up to Three Incorrect Answers</label>
                <div className='grid grid-cols-3 gap-4' id="incorrectAnswers">
                    <input type="text" name='' />
                    <input type="text" name='' />
                    <input type="text" name='' />
                </div>
                <button className='my-5' type='submit'>Add Question</button>
            </form>
        </div>
    )
}