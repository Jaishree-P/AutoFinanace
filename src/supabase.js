import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://msxlnuhhlvjmtqrmkrnk.supabase.co'

const supabaseKey = 'sb_publishable_2T5Bg1BSHCL_95NVPq2fOQ_qRME8WTf'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)