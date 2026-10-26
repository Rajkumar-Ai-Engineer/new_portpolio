const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
  const tables = ['projects', 'project_images', 'project_documents', 'skills', 'experience', 'contact_submissions', 'admin_audit_logs'];
  console.log('Inspecting target tables:');
  for (const t of tables) {
    const { data, error, count } = await supabase.from(t).select('*', { count: 'exact' }).limit(1);
    if (error) {
      console.log(`- ${t}: Not found / error: ${error.code} (${error.message})`);
    } else {
      console.log(`- ${t}: Exists! Total rows: ${count}`);
    }
  }
}

inspectSchema();
