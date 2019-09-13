
import guitarDb from '../localdb/guitars.json';
import projectDb from '../localdb/projects.json';

import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';

export async function findGuitar(id: number | string): Promise<Guitar> {
  if (guitarDb !== undefined && guitarDb.length > 0) {
    const guitar = (guitarDb as Guitar[]).find(data => data.id === Number(id));
    if (guitar) {
      return guitar;
    }

    return findProject(id);
  }

  throw new Error('Cannot find guitar');
}

export async function findProject(id: number | string): Promise<Project> {
  if (projectDb !== undefined && projectDb.length > 0) {
    const project = (projectDb as Project[]).find(data => data.id === Number(id));
    if (project) {
      return project;
    }
  }

  throw new Error('Cannot find guitar');
}

export async function findAllGuitars(): Promise<Guitar[]> {
  if (guitarDb === undefined) {
    throw new Error('Cannot find guitars');
  }

  return guitarDb as Guitar[];
}

export async function findAllProjects(): Promise<Project[]> {
  if (projectDb === undefined) {
    throw new Error('Cannot find project guitars');
  }

  return projectDb as Project[];
}
