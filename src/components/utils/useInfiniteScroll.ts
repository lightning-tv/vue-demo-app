import { ref, type Ref, watch } from 'vue';

export function useInfiniteScroll<T>(fetcher: (page: number) => Promise<T[]>) {
  const pages: Ref<T[]> = ref([]);
  const page: Ref<number> = ref(0);
  const end: Ref<boolean> = ref(false);

  const fetchContent = async () => {
    if (end.value) return;
    const content = await fetcher(page.value);
    if (content.length === 0) {
      end.value = true;
    } else {
      pages.value = [...pages.value, ...content];
    }
  };

  watch(page, fetchContent);

  return {
    pages,
    page,
    setPage: (newPage: number) => {
      page.value = newPage;
    },
    end,
    setEnd: (newEnd: boolean) => {
      end.value = newEnd;
    },
  };
}
