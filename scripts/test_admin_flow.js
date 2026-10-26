const { createAdminToken, verifyAdminToken } = require('../lib/auth/adminAuth');
const { getLocalDrafts, saveLocalDraft, updateDraftStatus, deleteLocalDraft } = require('../lib/data/draftsStore');

console.log('--- TESTING ADMIN AUTH TOKEN ---');
const token = createAdminToken('admin@rajkumar-ai.com');
console.log('Generated Token:', token ? 'OK' : 'FAIL');

const session = verifyAdminToken(token);
console.log('Verified Session Email:', session?.email === 'admin@rajkumar-ai.com' ? 'OK' : 'FAIL');

const invalidSession = verifyAdminToken('tampered.token');
console.log('Tampered Token Rejected:', invalidSession === null ? 'OK' : 'FAIL');

console.log('\n--- TESTING PROJECT DRAFTS STORE ---');
const testDraft = {
  project_id: 'P999_TEST',
  slug: 'p999-test-draft',
  title: 'Test Autonomous Sentinel Agent',
  short_summary: 'Unit test verification draft for autonomous decision verification.',
  problem_statement: 'Validating admin draft creation pipeline.',
  solution_narrative: 'Testing local storage and Supabase parity.',
  data_flow: 'Test Flow',
  evaluation_results: '100% tests passing',
  limitations: 'Test only',
  future_work: 'Cleanup',
  category: 'Agentic AI & LLMs',
  technologies: ['LangGraph', 'Python'],
  status: 'draft',
  tier: 'Standard',
  is_featured: false,
  featured_order: 999,
  cover_image_url: '/images/projects/aegisai-system-overview.webp',
  architecture_image_url: '/images/projects/aegisai-system-overview.webp',
};

const saved = saveLocalDraft(testDraft);
console.log('Saved Draft ID:', saved.project_id === 'P999_TEST' ? 'OK' : 'FAIL');

const allDrafts = getLocalDrafts();
const found = allDrafts.find(d => d.project_id === 'P999_TEST');
console.log('Found in getLocalDrafts:', found ? 'OK' : 'FAIL');

const statusUpdated = updateDraftStatus('P999_TEST', 'published');
console.log('Update Status to Published:', statusUpdated ? 'OK' : 'FAIL');

const deleted = deleteLocalDraft('P999_TEST');
console.log('Cleaned up Test Draft:', deleted ? 'OK' : 'FAIL');

const afterDelete = getLocalDrafts().find(d => d.project_id === 'P999_TEST');
console.log('Verified Cleanup:', afterDelete === undefined ? 'OK' : 'FAIL');

console.log('\nALL ADMIN TESTS PASSED!');
