import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Navbar({ session }) {

    const [loading, setLoading] = useState(true)
    const [loginStatus, setloginStatus] = useState(false)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setloginStatus(true)
                if (data.role == true) {

                }
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <nav className='bg-indigo-500'>
                <div className='max-w-5xl mx-auto'>
                    <div className='flex justify-between'>
                        <div className='flex space-x-4'>
                            <div>
                                <a href="/" className='flex items-center py-5 px-2'>
                                    <svg className='h-6 w-6 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                    </svg>
                                    <span className='font-bold'>BrainQuest</span>
                                </a>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <a href="/quizz-list" className='py-1 px-3'>Quizzes</a>
                                <a href="#" className='py-1 px-3'>Stats</a>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <a id='login' href="/login" className='py-2 px-3 shadow-lg shadow-indigo-800/50 bg-indigo-400 rounded hover:bg-indigo-300 transition duration-300'>{loginStatus == false ? 'Login' : 'Profile'}</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
