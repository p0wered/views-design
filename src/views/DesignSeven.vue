<script setup lang="ts">
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { ArrowRight } from 'lucide-vue-next';
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
    THESIS: Equal catalog plates with a dyed face, not indigo portrait stacks or chip marketplaces.
    OWN-WORLD: Dusty paper, wine ink, Manrope, 12px radius, hairline metric columns, no shadow.
    STORY: Visitor reads logo and amount together, checks three terms, chooses one MFO.
    FIRST VIEWPORT: Left title, count and sort, three-column plates, CTA under the metric strip.
    FORM: Homogeneous card grid, specified; 3-col catalog plate.
    FINISH: unreviewed and undocumented is unfinished; this build ends with
    the finish review, the verdict, DESIGN.md, and every shipping raster
    carrying its provenance
  -->
  <div class="design-seven min-h-[100dvh] text-[#3b1524]">
    <main class="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
          Выберите МФО по условиям
        </h1>
        <p class="mt-4 max-w-[44ch] text-lg leading-7 text-[#6d3a4d]">
          Одинаковые карточки, чтобы быстрее сравнить сумму и ставку
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mt-8" aria-label="Сетка предложений">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-[#6d3a4d]">
            <span>Найдено {{ offers.length }} предложений</span>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="(offer, index) in sortedOffers"
              :key="offer.id"
              class="offer-card flex flex-col overflow-hidden rounded-xl border border-[#8a3a52]/16 bg-white"
              :style="{ '--stagger': Math.min(index, 7) }"
            >
              <div class="logo-slot">
                <OfferLogo :logo="offer.logo" :name="offer.name"
                           size="md" />
              </div>
              <div class="card-face px-5 py-4">
                <p class="text-center text-2xl font-bold tracking-[-0.03em] tabular-nums">
                  До {{ formatAmount(offer.max_loan) }} ₽
                </p>
              </div>

              <dl>
                <div>
                  <dt>Ставка</dt>
                  <dd>{{ offer.percentage }}% / день</dd>
                </div>
                <div>
                  <dt>Срок</dt>
                  <dd>до {{ offer.loan_length_max }} дн.</dd>
                </div>
                <div>
                  <dt>Возраст</dt>
                  <dd>от {{ offer.approved_age_min }} лет</dd>
                </div>
              </dl>

              <div class="mt-auto p-4">
                <a
                  :href="offer.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl
                    bg-[#8f2d4a] px-4 font-semibold text-white focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-[#8f2d4a]"
                >
                  Выбрать
                  <ArrowRight class="h-4 w-4" aria-hidden="true" />
                </a>
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
.design-seven {
  font-family: Manrope, ui-sans-serif, system-ui, sans-serif;
  background: #f3eef0;
}

.design-seven :deep(select) {
  border-color: #e4d0d6;
  color: #3b1524;
}

.logo-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.card-face {
  background: #f3dce4;
  transition: background-color 180ms ease;
}

.offer-card dl {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 1px solid #ead0d7;
}

.offer-card dl > div {
  padding: 0.9rem 0.55rem;
  text-align: center;
}

.offer-card dl > div + div {
  border-left: 1px solid #ead0d7;
}

.offer-card dt {
  color: #7a4558;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1rem;
}

.offer-card dd {
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #3b1524;
  white-space: nowrap;
}

.cta {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}

.cta:hover {
  background: #7a243e;
}

.cta:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .offer-card:hover .card-face {
    background: #eeced9;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .offer-card {
    animation: plate-in 280ms cubic-bezier(0.23, 1, 0.32, 1) both;
    animation-delay: calc(var(--stagger, 0) * 40ms);
  }
}

@keyframes plate-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.design-seven ::selection {
  background: #f0d4dc;
  color: #3b1524;
}
</style>
