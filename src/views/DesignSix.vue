<script setup lang="ts">
import '@fontsource/golos-text/400.css';
import '@fontsource/golos-text/600.css';
import '@fontsource/golos-text/700.css';
import { ArrowUpRight } from 'lucide-vue-next';
import LegalFooter from '@/components/LegalFooter.vue';
import OfferLogo from '@/components/OfferLogo.vue';
import OffersState from '@/components/OffersState.vue';
import SortControl from '@/components/SortControl.vue';
import { useOffers } from '@/composables/useOffers';
import { formatAmount } from '@/utils/format';

const { error, loading, loadOffers, offers, sortedOffers, sortType } = useOffers();
</script>

<template>
  <!--
    THESIS: Comparison as wide slips, not a stack of portrait tiles like design-3.
    OWN-WORLD: Sage paper, pine ink, Golos Text, 16px radius, border without shadow.
    STORY: Visitor scans amount first, checks three terms, leaves to the MFO site.
    FIRST VIEWPORT: Left title, count and sort, two-column landscape cards, CTA full-width in each card.
    FORM: Homogeneous card grid, specified; 2-col ledger slip.
    FINISH: unreviewed and undocumented is unfinished; this build ends with
    the finish review, the verdict, DESIGN.md, and every shipping raster
    carrying its provenance
  -->
  <div class="design-six min-h-[100dvh] text-[#143126]">
    <main class="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
          Все предложения рядом
        </h1>
        <p class="mt-4 max-w-[42ch] text-lg leading-7 text-[#2f5a45]">
          Сравните сумму и условия, затем перейдите на сайт МФО
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mt-8" aria-label="Сетка предложений">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-[#2f5a45]">
            <span>Найдено {{ offers.length }} предложений</span>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <article
              v-for="(offer, index) in sortedOffers"
              :key="offer.id"
              class="offer-card flex flex-col rounded-2xl border border-[#1b5c3e]/12 bg-white p-5 md:p-6"
              :style="{ '--stagger': Math.min(index, 7) }"
            >
              <div class="grid gap-5 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] sm:items-center">
                <div class="flex h-16 items-center justify-start sm:h-20">
                  <OfferLogo :logo="offer.logo" :name="offer.name"
                             size="md" />
                </div>
                <div>
                  <p class="text-sm text-[#3d6b54]">Сумма</p>
                  <p class="mt-1 text-3xl font-bold tracking-[-0.03em] tabular-nums md:text-[2rem]">
                    До {{ formatAmount(offer.max_loan) }} ₽
                  </p>
                  <p class="mt-2 min-h-5 text-sm font-semibold text-[#14532d]">
                    <template v-if="offer.is_first_nopercentage === '1'">0% новым клиентам</template>
                    <template v-else>&nbsp;</template>
                  </p>
                </div>
              </div>

              <dl class="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-[#d7e4db]">
                <div>
                  <dt>Срок</dt>
                  <dd>до {{ offer.loan_length_max }} дн.</dd>
                </div>
                <div>
                  <dt>Ставка</dt>
                  <dd>{{ offer.percentage }}% / дн.</dd>
                </div>
                <div>
                  <dt>Возраст</dt>
                  <dd>от {{ offer.approved_age_min }} лет</dd>
                </div>
              </dl>

              <a
                :href="offer.link"
                target="_blank"
                rel="noopener noreferrer"
                class="cta mt-5 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#166534] px-5
                  font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-[#166534]"
              >
                Перейти на сайт
                <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
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
.design-six {
  font-family: 'Golos Text', ui-sans-serif, system-ui, sans-serif;
  background: #e8eee9;
}

.design-six :deep(select) {
  border-color: #c5d4cb;
  color: #143126;
}

.offer-card dl > div {
  background: #f4f7f4;
  padding: 0.85rem 0.7rem;
  text-align: center;
}

.offer-card dt {
  color: #3d6b54;
  font-size: 0.75rem;
  line-height: 1rem;
}

.offer-card dd {
  margin-top: 0.3rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #143126;
  white-space: nowrap;
}

.cta {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}

.cta:hover {
  background: #14532d;
}

.cta:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .offer-card {
    transition: border-color 180ms ease;
  }

  .offer-card:hover {
    border-color: rgb(22 101 52 / 0.35);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .offer-card {
    animation: slip-in 280ms cubic-bezier(0.23, 1, 0.32, 1) both;
    animation-delay: calc(var(--stagger, 0) * 40ms);
  }
}

@keyframes slip-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.design-six ::selection {
  background: #d8eadf;
  color: #143126;
}
</style>
