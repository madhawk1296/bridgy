import { supabaseServerClient } from "@/clients/supabase"

export default async function getItems() {
    const supabase = supabaseServerClient()
    const { data: items, error } = await supabase.from("items").select()

    return items
}