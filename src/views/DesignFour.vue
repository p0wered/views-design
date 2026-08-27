<script setup lang="ts">
import {
  ArrowUpRight,
  BadgePercent,
  CalendarDays,
  ChevronRight,
  Percent,
  UserRound
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import LegalFooter from '@/components/LegalFooter.vue';
import OfferLogo from '@/components/OfferLogo.vue';
import OffersState from '@/components/OffersState.vue';
import SortControl from '@/components/SortControl.vue';
import { useOffers } from '@/composables/useOffers';
import { formatAmount } from '@/utils/format';

const { error, loading, loadOffers, sortedOffers, sortType } = useOffers();
const selectedOfferId = ref('');
const activeOffer = computed(() => (
  sortedOffers.value.find(offer => offer.id === selectedOfferId.value) || sortedOffers.value[0]
));
</script>

<template>
  <div class="design-four min-h-[100dvh] bg-white text-zinc-950">
    <main class="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-20 md:pt-20">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-tight tracking-[-0.045em] md:text-5xl">
          Сравните предложения по одному
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-7 text-zinc-600">
          Выберите МФО, чтобы увидеть все условия без длинного списка карточек
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section v-if="activeOffer" class="mt-9"
                 aria-label="Сравнение предложений">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-4">
            <p class="text-sm text-zinc-500">Доступно {{ sortedOffers.length }} предложений</p>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <nav class="min-w-0" aria-label="Выбор МФО">
              <div class="flex gap-3 overflow-x-auto pb-2 lg:grid lg:gap-2 lg:overflow-visible lg:pb-0">
                <button
                  v-for="offer in sortedOffers"
                  :key="offer.id"
                  type="button"
                  :aria-pressed="activeOffer.id === offer.id"
                  class="group grid min-w-52 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border
                    px-4 py-4 text-left transition-colors active:translate-y-px focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-orange-700 lg:min-w-0 lg:w-full"
                  :class="activeOffer.id === offer.id
                    ? 'border-orange-700 bg-orange-50'
                    : 'border-zinc-200 bg-white hover:border-zinc-400'"
                  @click="selectedOfferId = offer.id"
                >
                  <span class="min-w-0">
                    <span class="flex h-8 items-center justify-start">
                      <OfferLogo :logo="offer.logo" :name="offer.name"
                                 size="sm" />
                    </span>
                    <span class="mt-3 block text-sm font-semibold text-zinc-800">
                      До {{ formatAmount(offer.max_loan) }} ₽
                    </span>
                  </span>
                  <ChevronRight
                    class="h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-700"
                    :class="activeOffer.id === offer.id ? 'text-orange-700' : ''"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </nav>

            <article class="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div class="flex min-h-28 flex-wrap items-center justify-between gap-5 px-6 py-6 md:px-8">
                <div class="flex h-14 items-center justify-start md:h-16">
                  <OfferLogo :logo="activeOffer.logo" :name="activeOffer.name"
                             size="lg" />
                </div>
                <span
                  v-if="activeOffer.is_first_nopercentage === '1'"
                  class="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm
                    font-semibold text-orange-800"
                >
                  <BadgePercent class="h-4 w-4" aria-hidden="true" />
                  0% новым клиентам
                </span>
              </div>

              <div class="grid border-t border-zinc-200 md:grid-cols-[minmax(0,1fr)_240px]">
                <div class="p-6 md:p-8">
                  <p class="text-sm font-medium text-zinc-600">Максимальная сумма</p>
                  <p class="mt-2 text-5xl font-bold tracking-[-0.055em] md:text-6xl">
                    {{ formatAmount(activeOffer.max_loan) }} ₽
                  </p>

                  <dl class="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
                    <div>
                      <dt><CalendarDays />Срок</dt>
                      <dd>до {{ activeOffer.loan_length_max }} дней</dd>
                    </div>
                    <div>
                      <dt><Percent />Ставка</dt>
                      <dd>{{ activeOffer.percentage }}% в день</dd>
                    </div>
                    <div>
                      <dt><UserRound />Возраст</dt>
                      <dd>от {{ activeOffer.approved_age_min }} лет</dd>
                    </div>
                  </dl>
                </div>

                <div class="flex flex-col justify-end bg-orange-700 p-6 text-white md:p-7">
                  <p class="text-sm font-medium text-orange-100">Вы выбрали {{ activeOffer.name }}</p>
                  <p class="mt-2 text-lg font-semibold leading-6">Продолжите оформление на сайте МФО</p>
                  <a
                    :href="activeOffer.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-6 inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl
                      bg-white px-5 font-semibold text-orange-800 transition-colors hover:bg-orange-50
                      active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-white"
                  >
                    Оформить
                    <ArrowUpRight class="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </OffersState>
    </main>
    <LegalFooter />
  </div>
</template>

<style scoped>
dt { display: flex; align-items: center; gap: 0.45rem; color: #71717a; font-size: 0.8125rem; }
dt :deep(svg) { width: 1rem; height: 1rem; color: #c2410c; }
dd { margin-top: 0.5rem; color: #18181b; font-size: 1rem; font-weight: 700; }
</style>
