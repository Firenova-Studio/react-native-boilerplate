import type { User } from './user.schema';

import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '../api/fetchUser';

const enum UserQueryKey {
  fetchOne = 'fetchOneUser',
}

export const useUserQuery = (currentId: User['id']) =>
  useQuery({
    enabled: currentId >= 0,
    queryFn: () => fetchUser(currentId),
    queryKey: [UserQueryKey.fetchOne, currentId],
  });
