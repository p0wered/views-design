<script setup lang="ts">
import { ArrowRight, CalendarDays, Percent, UserRound, WalletCards } from 'lucide-vue-next';
import LegalFooter from '@/components/LegalFooter.vue';
import OfferLogo from '@/components/OfferLogo.vue';
import OffersState from '@/components/OffersState.vue';
import SortControl from '@/components/SortControl.vue';
import { useOffers } from '@/composables/useOffers';
import { formatAmount } from '@/utils/format';

const { error, loading, loadOffers, offers, sortedOffers, sortType } = useOffers();
</script>

<template>
  <div class="design-three min-h-screen bg-[#f8f8ff] text-slate-950">
    <main class="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-12">
      <section class="text-center">
        <h1 class="text-4xl font-bold tracking-[-0.035em] md:text-5xl">Предложения займов</h1>
        <p class="mt-4 text-lg text-slate-500">Сравните условия и выберите подходящий вариант</p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mt-7">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>Найдено {{ offers.length }} предложений</span>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="offer in sortedOffers"
              :key="offer.id"
              class="flex flex-col rounded-[20px] border border-indigo-100 bg-white p-5
                shadow-[0_8px_30px_rgba(49,46,129,0.04)]"
            >
              <div class="flex items-center justify-center border-b border-slate-200 py-5">
                <OfferLogo :logo="offer.logo" :name="offer.name"
                           size="md" />
              </div>
              <dl class="mt-5 space-y-3 text-base">
                <div><dt><WalletCards /><span>Сумма</span></dt><dd>До {{ formatAmount(offer.max_loan) }} ₽</dd></div>
                <div><dt><CalendarDays /><span>Срок</span></dt><dd>До {{ offer.loan_length_max }} дней</dd></div>
                <div><dt><Percent /><span>Ставка</span></dt><dd>{{ offer.percentage }}% в день</dd></div>
                <div><dt><UserRound /><span>Возраст</span></dt><dd>От {{ offer.approved_age_min }} лет</dd></div>
              </dl>
              <a
                :href="offer.link"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-6 inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-indigo-600 px-5
                  font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Перейти к оформлению
                <ArrowRight class="h-5 w-5" aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
      </OffersState>
    </main>
    <LegalFooter />
  </div>
</template>

<style scoped>
dl > div { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
dt { display: inline-flex; align-items: center; gap: 0.55rem; color: #6b7280; }
dt :deep(svg) { width: 1.05rem; height: 1.05rem; color: #6366f1; }
dd { text-align: right; font-weight: 600; color: #111827; }
</style>
