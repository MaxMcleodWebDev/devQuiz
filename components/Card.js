import React from 'react'
import Link from 'next/link'

export default function Card({subject, src}) {
  return (
    <Link href={`/quizzes/${subject}`}>
        <div className="cursor-pointer ">
            <div className="rounded shadow-lg transition ease-in-out duration-500 hover:drop-shadow-2xl bg-white overflow-hidden h-full">
                <img className="w-fit l-fit" src={src} alt="" />
                <div className="m-4 ">
                    <span className="font-bold text-gray-600">{subject}</span>
                </div>
            </div>
        </div>
    </Link>
  )
}
