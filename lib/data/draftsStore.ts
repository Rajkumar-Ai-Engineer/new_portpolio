import fs from 'fs';
import path from 'path';
import { Project } from '../types';

const DRAFTS_FILE = path.join(process.cwd(), 'lib', 'data', 'drafts.json');

export function getLocalDrafts(): Project[] {
  try {
    if (!fs.existsSync(DRAFTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DRAFTS_FILE, 'utf-8');
    return JSON.parse(data) as Project[];
  } catch (err) {
    console.error('Error reading local drafts:', err);
    return [];
  }
}

export function saveLocalDraft(project: Project): Project {
  try {
    const drafts = getLocalDrafts();
    const existingIndex = drafts.findIndex(
      (d) => d.project_id === project.project_id || d.slug === project.slug
    );

    const updatedProject: Project = {
      ...project,
      updated_at: new Date().toISOString(),
      created_at: project.created_at || new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      drafts[existingIndex] = updatedProject;
    } else {
      drafts.unshift(updatedProject);
    }

    fs.writeFileSync(DRAFTS_FILE, JSON.stringify(drafts, null, 2), 'utf-8');
    return updatedProject;
  } catch (err) {
    console.error('Error saving local draft:', err);
    return project;
  }
}

export function updateDraftStatus(
  idOrSlug: string,
  newStatus: 'draft' | 'published' | 'archived' | 'trash'
): boolean {
  try {
    const drafts = getLocalDrafts();
    const target = drafts.find(
      (d) => d.project_id === idOrSlug || d.slug === idOrSlug
    );
    if (!target) return false;

    target.status = newStatus;
    target.updated_at = new Date().toISOString();
    fs.writeFileSync(DRAFTS_FILE, JSON.stringify(drafts, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error updating draft status:', err);
    return false;
  }
}

export function deleteLocalDraft(idOrSlug: string): boolean {
  try {
    const drafts = getLocalDrafts();
    const filtered = drafts.filter(
      (d) => d.project_id !== idOrSlug && d.slug !== idOrSlug
    );
    fs.writeFileSync(DRAFTS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error deleting local draft:', err);
    return false;
  }
}
