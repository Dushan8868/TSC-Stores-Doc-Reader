// Stores Issue Register – shared database connection.
// Put this file next to index.html in the GitHub repository (same folder).
// Both values are in Supabase → Project settings → API.
// The anon public key is meant to be public: the data is protected by sign-in and the
// row level security created by supabase_setup.sql. Never put the service_role key here.
window.SIR_CONFIG = {
  supabaseUrl: 'https://ytxchazotshdqocohaoy.supabase.co/rest/v1/',
supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGNoYXpvdHNoZHFvY29oYW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NTgyMzYsImV4cCI6MjEwNzUzNDIzNn0.xSYGbctm5QjgLlR-pcRpCO0Kfi4jMZwgeoW47uYH8SE'
};
