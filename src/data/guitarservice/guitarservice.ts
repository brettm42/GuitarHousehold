import guitarDb from '../localdb/guitars.json';
import instrumentDb from '../localdb/instruments.json';
import projectDb from '../localdb/projects.json';
import wishlistDb from '../localdb/wishlist.json';

import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';

export async function findInstrument(id: number | string, exhaustive: boolean): Promise<Guitar> {
  if (instrumentDb) {
    const instr = (instrumentDb as Guitar[]).find(data => data.id === Number(id));
    if (instr) {
      return instr;
    }
  }

  if (exhaustive) {
    return await findGuitar(id, exhaustive);
  }

  throw new Error(`Cannot find instrument database or item ID: ${id}`);
}

export function findInstrumentById(id: number | string): Guitar {
  if (instrumentDb) {
    const instr = (instrumentDb as Guitar[]).find(data => data.id === Number(id));
    if (instr) {
      return instr;
    }
  }

  throw new Error(`Cannot find instrument database or item ID: ${id}`);
}


export async function findGuitar(id: number | string, exhaustive: boolean): Promise<Guitar> {
  if (guitarDb) {
    const guitar = (guitarDb as Guitar[]).find(data => data.id === Number(id));
    if (guitar) {
      return guitar;
    }
  }

  if (exhaustive) {
    return await findProject(id, exhaustive);
  }

  throw new Error(`Cannot find guitar database or item ID: ${id}`);
}

export async function findProject(id: number | string, exhaustive: boolean): Promise<Project | Guitar> {
  if (projectDb) {
    const project = (projectDb as Project[]).find(data => data.id === Number(id));
    if (project) {
      return project;
    }
  }

  if (exhaustive) {
    return await findWishlist(id);
  }

  throw new Error(`Cannot find project database or item ID: ${id}`);
}

export async function findWishlist(id: number | string): Promise<Guitar> {
  if (wishlistDb) {
    const wishlist = (wishlistDb as Guitar[]).find(data => data.id === Number(id));
    if (wishlist) {
      return wishlist;
    }
  }

  throw new Error(`Cannot find wishlist database or item ID: ${id}`);
}

export async function findAllInstruments(): Promise<Guitar[]> {
  if (!instrumentDb) {
    throw new Error('Cannot find instruments');
  }

  return instrumentDb as Guitar[];
}

export async function findAllGuitars(): Promise<Guitar[]> {
  if (!guitarDb) {
    throw new Error('Cannot find guitars');
  }

  return (guitarDb as Guitar[]).filter(g => !g.archive);
}

export async function findAllProjects(): Promise<Project[]> {
  if (!projectDb) {
    throw new Error('Cannot find project guitars');
  }

  return (projectDb as Project[]).filter(g => !g.archive);
}

export async function findAllArchived(): Promise<Guitar[]> {
  if (!guitarDb) {
    throw new Error('Cannot find guitars');
  }

  return (guitarDb as Guitar[]).filter(g => g.archive);
}

export async function findAllSold(): Promise<Guitar[]> {
  if (!guitarDb) {
    throw new Error('Cannot find guitars');
  }

  return (guitarDb as Guitar[]).filter(g => g.soldDate);
}

export async function findAllWishlist(): Promise<Guitar[]> {
  if (!wishlistDb) {
    throw new Error('Cannot find wishlist');
  }

  return wishlistDb as Guitar[];
}
