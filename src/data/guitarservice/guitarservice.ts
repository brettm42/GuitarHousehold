import guitarDb from '../localdb/guitars.json';
import projectDb from '../localdb/projects.json';
import wishlistDb from '../localdb/wishlist.json';

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

  throw new Error(`Cannot find guitar with ID: ${id}`);
}

export async function findProject(id: number | string): Promise<Project | Guitar> {
  if (projectDb !== undefined && projectDb.length > 0) {
    const project = (projectDb as Project[]).find(data => data.id === Number(id));
    if (project) {
      return project;
    }

    return findWishlist(id);
  }

  throw new Error(`Cannot find guitar with ID: ${id}`);
}

export async function findWishlist(id: number | string): Promise<Guitar> {
  if (wishlistDb !== undefined && wishlistDb.length > 0) {
    const wishlist = (wishlistDb as Guitar[]).find(data => data.id === Number(id));
    if (wishlist) {      
      return wishlist;
    }
  }

  throw new Error(`Cannot find guitar with ID: ${id}`);
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

export async function findAllArchived(): Promise<Guitar[]> {
  if (guitarDb === undefined) {
    throw new Error('Cannot find guitars');
  }

  return (guitarDb as Guitar[]).filter(g => g.archive);
}

export async function findAllSold(): Promise<Guitar[]> {
  if (guitarDb === undefined) {
    throw new Error('Cannot find guitars');
  }

  return (guitarDb as Guitar[]).filter(g => g.soldDate);
}

export async function findAllWishlist(): Promise<Guitar[]> {
  if (wishlistDb === undefined) {
    throw new Error('Cannot find wishlist');
  }

  return wishlistDb as Guitar[];
}
