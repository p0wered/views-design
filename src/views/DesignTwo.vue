<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { computed } from 'vue';
import LegalFooter from '@/components/LegalFooter.vue';
import OfferLogo from '@/components/OfferLogo.vue';
import OffersState from '@/components/OffersState.vue';
import SortControl from '@/components/SortControl.vue';
import { useOffers } from '@/composables/useOffers';
import { formatAmount } from '@/utils/format';

const { error, loading, loadOffers, sortedOffers, sortType } = useOffers();
const featuredOffers = computed(() => sortedOffers.value.slice(0, 3));
const otherOffers = computed(() => sortedOffers.value.slice(3));
</script>

<template>
  <div class="design-two min-h-screen bg-white text-slate-950">
    <main>
      <section class="hero-mint">
        <div class="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <h1 class="max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-5xl">Подберите подходящий займ</h1>
          <p class="mt-5 text-lg text-slate-500 md:text-2xl">Сравните условия и выберите предложение</p>
        </div>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-2xl font-bold tracking-[-0.02em] md:text-3xl">Популярные предложения</h2>
            <div class="flex items-center gap-3 text-sm text-slate-500">
              <span class="hidden sm:inline">Сортировка</span>
              <SortControl v-model="sortType" variant="outlined" />
            </div>
          </div>

          <div class="mt-7 grid gap-5 lg:grid-cols-3">
            <article v-for="offer in featuredOffers" :key="offer.id"
                     class="flex min-h-[350px] flex-col rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <div class="flex h-16 items-center justify-start">
                <OfferLogo :logo="offer.logo" :name="offer.name"
                           size="md" />
              </div>
              <div class="my-5 h-px bg-slate-200" />
              <div class="flex min-h-6 items-center justify-between gap-3">
                <p class="text-sm text-slate-500">Сумма займа</p>
                <span
                  v-if="offer.is_first_nopercentage === '1'"
                  class="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700"
                >
                  0% для новых клиентов
                </span>
              </div>
              <p class="mt-1 text-3xl font-bold tracking-[-0.035em]">До {{ formatAmount(offer.max_loan) }} ₽</p>
              <dl class="mt-5 grid grid-cols-2 gap-4 text-base">
                <div><dt>Срок</dt><dd>до {{ offer.loan_length_max }} дней</dd></div>
                <div><dt>Возраст</dt><dd>от {{ offer.approved_age_min }} лет</dd></div>
              </dl>
              <div class="mt-auto pt-6">
                <a
                  :href="offer.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-teal-600 px-5
                    font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  Перейти на сайт МФО
                  <ArrowRight class="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>

          <div v-if="otherOffers.length" class="mt-9">
            <h2 class="text-2xl font-bold tracking-[-0.02em]">Ещё предложения</h2>
            <div class="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <article
                v-for="offer in otherOffers"
                :key="offer.id"
                class="grid items-center gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0
                  md:grid-cols-[1.2fr_1fr_1fr_0.8fr_220px]"
              >
                <div class="flex h-10 min-w-0 items-center justify-start">
                  <OfferLogo :logo="offer.logo" :name="offer.name"
                             size="sm" />
                </div>
                <span class="font-semibold">До {{ formatAmount(offer.max_loan) }} ₽</span>
                <span class="text-base text-slate-600">до {{ offer.loan_length_max }} дней</span>
                <span class="text-base text-slate-600">от {{ offer.approved_age_min }} лет</span>
                <a
                  :href="offer.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-teal-600
                    px-4 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  Перейти на сайт МФО
                  <ArrowRight class="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>
      </OffersState>
    </main>
    <LegalFooter />
  </div>
</template>

<style scoped>
.hero-mint { background: #f4fbfa; }
dt { color: #64748b; }
dd { margin-top: 0.35rem; font-weight: 600; color: #0f172a; }
</style>
