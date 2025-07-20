import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kctuhnrehiptkuqltfjh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdHVobnJlaGlwdGt1cWx0ZmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MDkxMTMsImV4cCI6MjA2ODI4NTExM30.f9A0ruf-Sg7WwZGU8Nn23tNnDIW34LxniPkgr_ldORY'

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)