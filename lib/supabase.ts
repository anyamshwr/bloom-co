import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wawukwmketdyzwxsgpiq.supabase.co'
const supabaseKey = 'sb_publishable_p6xGWWRgxBVWPfdsGIG9uw_AV8t_sr1'

export const supabase = createClient(supabaseUrl, supabaseKey)
