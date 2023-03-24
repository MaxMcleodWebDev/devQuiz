import React from 'react'
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'

export default function CreateQuestion() {

    const [questionAnswers, setQuestionAnswers] = useState([])

    const addQuestion = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.target)

        const myData = Object.fromEntries(formData)

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
            .insert([
                { question: myData.questionTitle, answers: questionAnswers, subject: myData.subject },
            ])

        if (error) {
            throw error

        }
    }

    return (
        <div className='container'>
            <form onSubmit={addQuestion} className='mt-20'>
                <label htmlFor="subject">Select the Questions Subject</label>
                <select className='text-black' name="subject" required >
                    <option className='test-black' value="">Select Subject</option>
                    <option className='text-black' value="Maths">Maths</option>
                    <option className='text-black' value="Science">Science</option>
                    <option className='text-black' value="English">English</option>
                </select>

                <label className='pt-5' htmlFor="questionTitle">Enter a Question</label>
                <input name='questionTitle' type="text" />

                <label className='pt-5' htmlFor="correctAnswer">Input the Correct Answer</label>
                <input type="text" name='correctAnswer' required />

                <label className='pt-5' htmlFor="incorrectAnswers">Input up to Three Incorrect Answers</label>
                <div className='grid grid-cols-3 gap-4'>
                    <input type="text" name='' />
                    <input type="text" name='' />
                    <input type="text" name='' />
                </div>

                <button className='my-5' type='submit'>Add Question</button>
            </form>
            <a href="/">
                <button>Return to Menu</button>
            </a>
        </div>
    )
}