import { useQuery } from '@tanstack/react-query';
import { getContentBlock } from '@/modules/portfolio/server/content';
import type { ContentBlock } from '@/modules/portfolio/types';

export function useContentBlock(key: string) {
  return useQuery<ContentBlock | null>({
    queryKey: ['contentBlock', key],
    queryFn: async () => {
      const res = await getContentBlock({ key });
      return res.data ?? null;
    },
  });
}
