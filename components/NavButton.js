import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavButton({ href, nav }) {

    return (
        <Link href={href} >
            <a className="uppercase border rounded-md py-2 px-3 m-2 border-neutral-800 text-center">
                {nav}
            </a>
        </Link>
    )
}
