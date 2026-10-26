const fetch = globalThis.fetch;
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SECRET_KEY;

async function testSqlApi() {
  // Test pg_meta / sql endpoint
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      }
    });
    console.log('Rest v1 endpoint status:', res.status);
  } catch (e) {
    console.log('Error:', e.message);
  }
}

testSqlApi();
