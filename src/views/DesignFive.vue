<script setup lang="ts">
import { ArrowRight, ArrowUpRight, CalendarDays, Percent, UserRound, WalletCards } from 'lucide-vue-next';
import { computed } from 'vue';
import LegalFooter from '@/components/LegalFooter.vue';
import OfferLogo from '@/components/OfferLogo.vue';
import OffersState from '@/components/OffersState.vue';
import SortControl from '@/components/SortControl.vue';
import { useOffers } from '@/composables/useOffers';
import { formatAmount } from '@/utils/format';

const { error, loading, loadOffers, sortedOffers, sortType } = useOffers();
const leadOffer = computed(() => sortedOffers.value[0]);
const otherOffers = computed(() => sortedOffers.value.slice(1));
</script>

<template>
  <div class="design-five min-h-screen bg-white text-stone-950">
    <main class="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-20 md:pt-20">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-tight tracking-[-0.045em] md:text-5xl">
          Условия, которые видно сразу
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-7 text-stone-600">
          Главное предложение крупно, остальные варианты рядом для быстрого выбора
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section v-if="leadOffer" class="mt-9">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-4">
            <p class="text-sm text-stone-500">Доступно {{ sortedOffers.length }} предложений</p>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
            <article class="flex flex-col self-start rounded-2xl border border-lime-200 bg-lime-50/60 p-6 md:p-8">
              <div class="flex flex-wrap items-start justify-between gap-5">
                <div class="flex h-16 items-center justify-start">
                  <OfferLogo :logo="leadOffer.logo" :name="leadOffer.name"
                             size="lg" />
                </div>
                <span
                  v-if="leadOffer.is_first_nopercentage === '1'"
                  class="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-lime-800 shadow-sm"
                >
                  0% новым клиентам
                </span>
              </div>

              <div class="mt-10 md:mt-14">
                <p class="text-sm font-medium text-stone-600">Максимальная сумма</p>
                <p class="mt-2 text-5xl font-bold tracking-[-0.055em] md:text-6xl">
                  {{ formatAmount(leadOffer.max_loan) }} ₽
                </p>
              </div>

              <dl class="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-lime-200 py-6 sm:grid-cols-4">
                <div>
                  <dt><CalendarDays />Срок</dt>
                  <dd>до {{ leadOffer.loan_length_max }} дней</dd>
                </div>
                <div>
                  <dt><Percent />Ставка</dt>
                  <dd>{{ leadOffer.percentage }}% в день</dd>
                </div>
                <div>
                  <dt><UserRound />Возраст</dt>
                  <dd>от {{ leadOffer.approved_age_min }} лет</dd>
                </div>
                <div>
                  <dt><WalletCards />Получение</dt>
                  <dd>на сайте МФО</dd>
                </div>
              </dl>

              <a
                :href="leadOffer.link"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-8 inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-lime-800 px-6
                  font-semibold text-white transition hover:bg-lime-900 active:translate-y-px focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-lime-800"
              >
                Оформить
                <ArrowRight class="h-5 w-5" aria-hidden="true" />
              </a>
            </article>

            <section class="overflow-hidden rounded-2xl border border-stone-200" aria-labelledby="other-offers-title">
              <div class="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4">
                <h2 id="other-offers-title" class="text-xl font-bold tracking-[-0.02em]">Другие варианты</h2>
                <span class="text-sm text-stone-500">{{ otherOffers.length }}</span>
              </div>

              <article
                v-for="offer in otherOffers"
                :key="offer.id"
                class="grid gap-4 border-b border-stone-200 p-5 last:border-b-0
                  sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <div class="min-w-0">
                  <div class="flex h-9 items-center justify-start">
                    <OfferLogo :logo="offer.logo" :name="offer.name"
                               size="sm" />
                  </div>
                  <p class="mt-4 text-xl font-bold tracking-[-0.025em]">
                    До {{ formatAmount(offer.max_loan) }} ₽
                  </p>
                  <p class="mt-1 text-sm leading-5 text-stone-600">
                    До {{ offer.loan_length_max }} дней, {{ offer.percentage }}% в день, от
                    {{ offer.approved_age_min }} лет
                  </p>
                </div>
                <a
                  :href="offer.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-lime-700
                    px-4 text-sm font-semibold text-lime-800 transition hover:bg-lime-50 active:translate-y-px
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-800"
                >
                  Оформить
                  <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </section>
          </div>
        </section>
      </OffersState>
    </main>
    <LegalFooter />
  </div>
</template>

<style scoped>
dt { display: flex; align-items: center; gap: 0.45rem; color: #57534e; font-size: 0.8125rem; }
dt :deep(svg) { width: 1rem; height: 1rem; color: #4d7c0f; }
dd { margin-top: 0.45rem; color: #1c1917; font-size: 0.9375rem; font-weight: 700; }
</style>
