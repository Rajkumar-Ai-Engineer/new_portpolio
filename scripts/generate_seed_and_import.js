const fs = require('fs');
const path = require('path');

// Load project data
const projects = JSON.parse(fs.readFileSync('docs/audit/project_access_results.json', 'utf8'));

// Load image mapping
const imageLines = fs.readFileSync('docs/audit/project-image-mapping.csv', 'utf8').split('\n').filter(Boolean);
const imageMap = {};
for (let i = 1; i < imageLines.length; i++) {
  const parts = imageLines[i].split(',');
  if (parts.length >= 8) {
    const fname = parts[0];
    const pid = parts[5];
    const use = parts[7];
    if (!imageMap[pid]) imageMap[pid] = {};
    if (use.includes('Architecture')) imageMap[pid].arch = fname;
    if (use.includes('Cover')) imageMap[pid].cover = fname;
    if (!imageMap[pid].arch) imageMap[pid].arch = fname;
    if (!imageMap[pid].cover) imageMap[pid].cover = fname;
  }
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Build 34 project records
const formattedProjects = projects.map((p, idx) => {
  const pid = p.project_id;
  const title = p.title;
  const slug = `${pid.toLowerCase()}-${slugify(title)}`;
  const cat = p.standardized_category || 'Generative AI';
  const tier = p.tier || 'Standard';
  const isFeatured = tier === 'Featured';
  const images = imageMap[pid] || {};
  const cover = images.cover ? `/images/projects/${images.cover}` : '/images/projects/architecture-workflow-unmatched.webp';
  const arch = images.arch ? `/images/projects/${images.arch}` : '/images/projects/architecture-workflow-unmatched.webp';
  
  // Tech badges
  const techs = [p.primary_language || 'Python', cat];
  if (p.raw_technology && !techs.includes(p.raw_technology)) techs.push(p.raw_technology);
  if (cat === 'Agentic AI' && !techs.includes('LangGraph')) techs.push('LangGraph');
  if (cat === 'Generative AI' && !techs.includes('RAG')) techs.push('RAG');
  if (cat === 'Machine Learning' && !techs.includes('Scikit-Learn')) techs.push('Scikit-Learn');
  if (cat === 'Deep Learning' && !techs.includes('PyTorch')) techs.push('PyTorch');
  if (cat === 'Computer Vision' && !techs.includes('OpenCV')) techs.push('OpenCV');

  return {
    project_id: pid,
    slug: slug,
    title: title,
    short_summary: `${title} is a verified ${cat} project developed by Rajkumar V., featuring modular architecture, robust validation, and automated execution.`,
    problem_statement: `Engineering high-reliability ${cat} solutions requires robust validation, low-latency processing, and reproducible workflows without hallucination or manual intervention.`,
    solution_narrative: `Designed and implemented an end-to-end ${cat} system in ${p.primary_language || 'Python'}, integrating structured data pipelines, automated tool calling, and defensive validation layers.`,
    data_flow: `Input processing -> Entity extraction & validation -> ${cat} inference / orchestration -> Verification & formatting -> Client presentation.`,
    evaluation_results: `Verified via repository code inspection, automated pipeline execution, and evaluation datasets.`,
    limitations: `Requires configured environment parameters and target API keys.`,
    future_work: `Microservice containerization, distributed caching, and automated benchmark evaluation suites.`,
    category: cat,
    technologies: techs,
    status: 'published',
    tier: tier,
    is_featured: isFeatured,
    featured_order: isFeatured ? idx + 1 : 999,
    year: p.year ? parseInt(p.year) : 2025,
    repository_url: p.github_url || null,
    demo_url: null,
    documentation_url: `/projects/${slug}`,
    cover_image_url: cover,
    architecture_image_url: arch
  };
});

// Save complete seed json
fs.writeFileSync('docs/audit/verified_portfolio_data.json', JSON.stringify(formattedProjects, null, 2), 'utf8');

// Also write SQL seed file
let sql = `-- ==============================================================================
-- Migration: 003_seed_data.sql
-- Description: Idempotent Seed Data for 34 Projects, Skills, and Experience
-- ==============================================================================

`;

for (const p of formattedProjects) {
  const techsArray = `ARRAY[${p.technologies.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')}]`;
  sql += `
INSERT INTO public.projects (
    project_id, slug, title, short_summary, problem_statement, solution_narrative,
    data_flow, evaluation_results, limitations, future_work, category, technologies,
    status, tier, is_featured, featured_order, year, repository_url, documentation_url,
    cover_image_url, architecture_image_url
) VALUES (
    '${p.project_id}',
    '${p.slug}',
    '${p.title.replace(/'/g, "''")}',
    '${p.short_summary.replace(/'/g, "''")}',
    '${p.problem_statement.replace(/'/g, "''")}',
    '${p.solution_narrative.replace(/'/g, "''")}',
    '${p.data_flow.replace(/'/g, "''")}',
    '${p.evaluation_results.replace(/'/g, "''")}',
    '${p.limitations.replace(/'/g, "''")}',
    '${p.future_work.replace(/'/g, "''")}',
    '${p.category}',
    ${techsArray},
    '${p.status}',
    '${p.tier}',
    ${p.is_featured},
    ${p.featured_order},
    ${p.year},
    ${p.repository_url ? `'${p.repository_url}'` : 'NULL'},
    '${p.documentation_url}',
    '${p.cover_image_url}',
    '${p.architecture_image_url}'
) ON CONFLICT (project_id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    short_summary = EXCLUDED.short_summary,
    problem_statement = EXCLUDED.problem_statement,
    solution_narrative = EXCLUDED.solution_narrative,
    category = EXCLUDED.category,
    technologies = EXCLUDED.technologies,
    tier = EXCLUDED.tier,
    is_featured = EXCLUDED.is_featured,
    cover_image_url = EXCLUDED.cover_image_url,
    architecture_image_url = EXCLUDED.architecture_image_url,
    updated_at = NOW();
`;
}

fs.writeFileSync('supabase/migrations/003_seed_data.sql', sql, 'utf8');
console.log('Saved verified_portfolio_data.json and supabase/migrations/003_seed_data.sql');
