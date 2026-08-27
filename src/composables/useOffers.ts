import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCookie } from '@/utils/format';
import type { Offer, SortType } from '@/types';

interface OffersResponse {
  offers?: Offer[]
}

const apiUrl = 'https://api.click-lead.ru/offers?v=2.0';
const showcaseId = import.meta.env.VITE_CLICKLEAD_VID || '112';

export const useOffers = () => {
  const route = useRoute();
  const offers = ref<Offer[]>([]);
  const loading = ref(true);
  const error = ref('');
  const sortType = ref<SortType>('default');

  const sortedOffers = computed(() => {
    const items = [...offers.value];
    if (sortType.value === 'amount') {
      return items.sort((a, b) => Number(b.max_loan) - Number(a.max_loan));
    }
    if (sortType.value === 'term') {
      return items.sort((a, b) => Number(b.loan_length_max) - Number(a.loan_length_max));
    }
    return items;
  });

  const loadOffers = async (): Promise<void> => {
    loading.value = true;
    error.value = '';

    const params = new URLSearchParams({
      vid: showcaseId,
      uid: String(route.query.uid || getCookie('lead_id')),
      additional_utms: JSON.stringify({
        utm_source: getCookie('utm_source'),
        utm_web: String(route.query.utm_web || '')
      })
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json() as OffersResponse;
      if (!data.offers?.length) throw new Error('Пустой список офферов');
      offers.value = data.offers;
    } catch (cause) {
      console.error('Ошибка загрузки предложений:', cause);
      error.value = 'Не удалось загрузить предложения. Попробуйте ещё раз.';
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadOffers);

  return { error, loading, loadOffers, offers, sortedOffers, sortType };
};
