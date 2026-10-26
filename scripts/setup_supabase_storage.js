const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !serviceKey) {
  console.log('Missing Supabase configuration.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function setupBuckets() {
  console.log('Checking and creating Supabase storage buckets...');
  
  const { data: existingBuckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.log('Error listing buckets:', listErr.message);
    return;
  }
  
  const bucketNames = existingBuckets.map(b => b.name);
  
  // 1. Create 'project-assets' (public)
  if (!bucketNames.includes('project-assets')) {
    const { data, error } = await supabase.storage.createBucket('project-assets', {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/webp', 'image/png', 'image/jpeg', 'application/pdf']
    });
    if (error) console.log('Error creating project-assets bucket:', error.message);
    else console.log('Successfully created public bucket: project-assets');
  } else {
    console.log('Bucket project-assets already exists.');
  }

  // 2. Create 'private-documents' (private)
  if (!bucketNames.includes('private-documents')) {
    const { data, error } = await supabase.storage.createBucket('private-documents', {
      public: false,
      fileSizeLimit: 20971520, // 20MB
      allowedMimeTypes: ['application/pdf', 'application/json', 'text/markdown']
    });
    if (error) console.log('Error creating private-documents bucket:', error.message);
    else console.log('Successfully created private bucket: private-documents');
  } else {
    console.log('Bucket private-documents already exists.');
  }
}

setupBuckets();
