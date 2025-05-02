import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
export const useUser = () => {
  const supabase = createClient();
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      return user;
    },
    staleTime: Infinity
  });

  return { user };
};
