import { apiClient } from '@/shared/api/client';

import { userSchema } from '../model/user.schema';

export const fetchUser = async (id: number) => {
  const response = await apiClient.get(`users/${id}`).json();

  return userSchema.parse(response);
};
