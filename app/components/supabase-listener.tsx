'use server'

import { Database } from "@/lib/database.types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Navigation } from "./navigation"

export const SupabaseListener = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: {session},
    } = await supabase.auth.getSession()

    return <Navigation session={session}/>
}