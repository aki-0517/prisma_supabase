'use client'

import { Session } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"



export const Navigation = ({session}: {session:Session | null}) => {
    return (
        <div>
        {session ? (<Link href="/profile" />
        ) : (
            <div>
            <Link href="/auth/login">ログイン</Link>
            <Link href="/auth/signup">サインアップ</Link>
            </div>
        ) }
        </div>
    )
}