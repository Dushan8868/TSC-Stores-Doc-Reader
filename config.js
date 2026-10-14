// Stores Issue Register – shared database connection.
// Put this file next to index.html in the GitHub repository (same folder).
// Both values are in Supabase → Project settings → API.
// The anon public key is meant to be public: the data is protected by sign-in and the
// row level security created by supabase_setup.sql. Never put the service_role key here.
window.SIR_CONFIG = {
  supabaseUrl: 'https://YOUR-PROJECT-ID.supabase.co',
  supabaseKey: 'YOUR-ANON-PUBLIC-KEY'
};
