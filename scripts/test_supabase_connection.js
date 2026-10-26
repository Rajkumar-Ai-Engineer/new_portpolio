const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables from .env.local without logging values
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('STATUS: Missing Supabase URL or Key in environment.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  try {
    const { data, error } = await supabase.from('projects').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.code === '42P01') {
        console.log('STATUS: Connected to Supabase, but "projects" table does not exist yet (Needs migration).');
      } else {
        console.log('STATUS: Supabase returned error code:', error.code, error.message);
      }
    } else {
      console.log('STATUS: Supabase connection successful! Existing projects table count:', data);
    }
  } catch (err) {
    console.log('STATUS: Connection exception:', err.message);
  }
}

checkConnection();
