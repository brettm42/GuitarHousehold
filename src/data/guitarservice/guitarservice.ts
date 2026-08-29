import { hasSold, isArchived } from './guitarutils';
import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';
import { getAccountDatabase } from '../accountservice/accountservice';

export async function find(
  id: number | string,
  accountId?: string,
  exhaustive: boolean = true
): Promise<Guitar> {
  return await findInstrument(id, accountId, exhaustive);
}

export async function findInstrument(
  id: number | string,
  accountId?: string,
  exhaustive: boolean = false
): Promise<Guitar> {
  const { instruments } = getAccountDatabase(accountId);
  if (instruments) {
    const instr = instruments.find((data) => data.id === Number(id));
    if (instr) {
      return instr;
    }
  }

  if (exhaustive) {
    return await findGuitar(id, accountId, exhaustive);
  }

  throw new Error(`Cannot find instrument database or item ID: ${id}`);
}

export async function findGuitar(
  id: number | string,
  accountId?: string,
  exhaustive: boolean = false
): Promise<Guitar> {
  const { guitars } = getAccountDatabase(accountId);
  if (guitars) {
    const guitar = guitars.find((data) => data.id === Number(id));
    if (guitar) {
      return guitar;
    }
  }

  if (exhaustive) {
    return await findProject(id, accountId, exhaustive);
  }

  throw new Error(`Cannot find guitar database or item ID: ${id}`);
}

export async function findProject(
  id: number | string,
  accountId?: string,
  exhaustive: boolean = false
): Promise<Project | Guitar> {
  const { projects } = getAccountDatabase(accountId);
  if (projects) {
    const project = projects.find((data) => data.id === Number(id));
    if (project) {
      return project;
    }
  }

  if (exhaustive) {
    return await findWishlist(id, accountId);
  }

  throw new Error(`Cannot find project database or item ID: ${id}`);
}

export async function findWishlist(
  id: number | string,
  accountId?: string,
  exhaustive: boolean = false
): Promise<Guitar> {
  const { wishlist } = getAccountDatabase(accountId);
  if (wishlist) {
    const item = wishlist.find((data) => data.id === Number(id));
    if (item) {
      return item;
    }
  }

  throw new Error(
    `Cannot ${exhaustive ? 'exhaustive ' : ''}find wishlist database or item ID: ${id}`
  );
}

export async function findEverything(accountId?: string): Promise<Guitar[]> {
  return [
    ...(await findAllGuitars(accountId)),
    ...(await findAllProjects(accountId)),
    ...(await findAllInstruments(accountId)),
    ...(await findAllArchived(accountId)),
    ...(await findAllWishlist(accountId)),
    ...(await findAllSold(accountId)),
  ];
}

export async function findAllInstruments(accountId?: string): Promise<Guitar[]> {
  const { instruments } = getAccountDatabase(accountId);
  return instruments || [];
}

export async function findAllGuitars(accountId?: string): Promise<Guitar[]> {
  const { guitars } = getAccountDatabase(accountId);
  return (guitars || []).filter((g) => !isArchived(g));
}

export async function findAllProjects(accountId?: string): Promise<Project[]> {
  const { projects } = getAccountDatabase(accountId);
  return (projects || []).filter((g) => !isArchived(g));
}

export async function findAllArchived(accountId?: string): Promise<Guitar[]> {
  const { guitars } = getAccountDatabase(accountId);
  return (guitars || []).filter((g) => isArchived(g));
}

export async function findAllSold(accountId?: string): Promise<Guitar[]> {
  const { guitars } = getAccountDatabase(accountId);
  return (guitars || []).filter((g) => hasSold(g));
}

export async function findAllWishlist(accountId?: string): Promise<Guitar[]> {
  const { wishlist } = getAccountDatabase(accountId);
  return wishlist || [];
}
