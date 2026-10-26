require('dotenv').config({ path: '.env.local' });
console.log('Configured env variable keys:', Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('DATABASE') || k.includes('POSTGRES')));
