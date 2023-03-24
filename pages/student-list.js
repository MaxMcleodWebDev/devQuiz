import React from 'react'
import { supabase } from '../utils/supabaseClient'

export default function studentList({ users }) {

    return (
        <div>
            {users.map((user, i) => {
                if(user.role !== true) {
                    return (
                        <div key={i} className='container p-5'>
                            <a className='my-5' href={`/student/${user.id}`}>
                                <button className='card'>{user.username}</button>
                            </a>
                        </div>
                    )
                }
            })}
            <a href="/">
                <button>Return to Menu</button>
            </a>
        </div>
    )
}

export async function getStaticProps() {
    let { data: users, error } = await supabase
        .from('profiles')
        .select('*')

    if (error) {
        throw error
    }

    return {
        props: {
            users
        }
    }
}
