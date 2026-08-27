<script setup lang="ts">
import { ArrowRight, CalendarDays, Percent, UserRound, WalletCards } from 'lucide-vue-next';
import LegalFooter from '@/components/LegalFooter.vue';
import OfferLogo from '@/components/OfferLogo.vue';
import OffersState from '@/components/OffersState.vue';
import SortControl from '@/components/SortControl.vue';
import { useOffers } from '@/composables/useOffers';
import { formatAmount } from '@/utils/format';

const { error, loading, loadOffers, sortedOffers, sortType } = useOffers();
</script>

<template>
  <div class="design-one min-h-screen bg-white text-slate-950">
    <main>
      <section class="mx-auto max-w-6xl px-5 pb-7 pt-12 md:pb-10 md:pt-16">
        <h1 class="max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-5xl">Сравните предложения займов</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-500 md:text-xl">
          Выберите подходящие условия и перейдите к оформлению на сайте МФО
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="border-y border-slate-200">
          <div class="mx-auto max-w-6xl px-5">
            <div
              class="grid min-h-20 items-center gap-6 border-b border-slate-200
                xl:grid-cols-[260px_minmax(480px,1fr)_220px]"
            >
              <SortControl v-model="sortType" />
              <div class="hidden grid-cols-4 gap-6 text-sm font-semibold text-slate-600 xl:grid">
                <span class="flex items-center gap-2"><WalletCards class="h-4 w-4" aria-hidden="true" />Сумма</span>
                <span class="flex items-center gap-2"><CalendarDays class="h-4 w-4" aria-hidden="true" />Срок</span>
                <span class="flex items-center gap-2"><Percent class="h-4 w-4" aria-hidden="true" />Ставка</span>
                <span class="flex items-center gap-2"><UserRound class="h-4 w-4" aria-hidden="true" />Возраст</span>
              </div>
              <span class="hidden xl:block" />
            </div>

            <article
              v-for="offer in sortedOffers"
              :key="offer.id"
              class="grid items-center gap-6 border-b border-slate-200 py-8 last:border-b-0
                lg:grid-cols-[minmax(220px,1.1fr)_minmax(600px,2.1fr)]
                xl:grid-cols-[260px_minmax(480px,1fr)_220px]"
            >
              <div class="flex h-16 items-center justify-start md:h-12">
                <OfferLogo :logo="offer.logo" :name="offer.name"
                           size="md" />
              </div>
              <dl class="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4 lg:gap-6">
                <div><dt>Сумма</dt><dd>{{ formatAmount(offer.max_loan) }} ₽</dd></div>
                <div><dt>Срок</dt><dd>до {{ offer.loan_length_max }} дней</dd></div>
                <div><dt>Ставка</dt><dd>{{ offer.percentage }}% в день</dd></div>
                <div><dt>Возраст</dt><dd>от {{ offer.approved_age_min }} лет</dd></div>
              </dl>
              <a
                :href="offer.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 text-sm
                  font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Перейти
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
dt { font-size: 0.8125rem; line-height: 1.125rem; color: #64748b; }
dd { margin-top: 0.4rem; font-size: 1.25rem; line-height: 1.6rem; font-weight: 700; letter-spacing: -0.02em; }
</style>
