import React from 'react'
import { useState } from 'react'
import NavButton from '../components/NavButton'
import { supabase } from '../utils/supabaseClient'

export default function questionList({ questions }) {

    const [toggleSubject, setToggleSubject] = useState("MATHS")

    const toggle = (e) => {
        setToggleSubject(e.target.innerText)
    }

    return (
        <div>
            <div>
                <button onClick={(e) => toggle(e)}>Maths</button>
                <button onClick={(e) => toggle(e)}>Science</button>
                <button onClick={(e) => toggle(e)}>English</button>
            </div>

            <p>Click on the different subjects above to show all questions under that subject.</p>
            <p>You can click on a question to view it in detail.</p>

            {questions.map((question, i) => {
                if (question.subject.toUpperCase() == toggleSubject) {
                    return (
                        <div className='card m-5'>
                            <a href={`/question/${question.id}`}>
                                {question.question}
                            </a>
                        </div>
                    )
                }
            })}
            <NavButton href='/' nav='return to menu' />
        </div>
    )
}

export async function getStaticProps() {

    const { data: questions, error } = await supabase
        .from('questions')
        .select('*')

    if (error) {
        console.log(error.message)
    }

    return {
        props: {
            questions
        }
    }
}