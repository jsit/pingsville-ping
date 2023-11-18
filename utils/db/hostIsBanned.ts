import { bannedHosts } from './client.ts';

export const hostIsBanned = async (
  host: string,
): Promise<boolean> => {
  const match = await bannedHosts.find({ host });

  return match.length > 0;
};
