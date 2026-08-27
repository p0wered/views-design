<script setup lang="ts">
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';
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
    THESIS: Equal light plates in a grid. Refuses the dark accordion and dyed catalog faces.
    OWN-WORLD: Cold paper, ink type, Nunito Sans, 12px radius, left-aligned specs, no shadow.
    STORY: Visitor reads logo and amount, checks three terms, leaves on the ink button.
    FIRST VIEWPORT: Left title, count and sort, two then three equal cards, CTA in each plate.
    FORM: Homogeneous card grid, specified; light ink plates.
    FINISH: unreviewed and undocumented is unfinished; this build ends with
    the finish review, the verdict, DESIGN.md, and every shipping raster
    carrying its provenance
  -->
  <div class="design-ten min-h-[100dvh] text-[#1a1d23]">
    <main class="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
          Все предложения в одной сетке
        </h1>
        <p class="mt-4 max-w-[44ch] text-lg leading-7 text-[#5c6570]">
          Одинаковые карточки, чтобы сравнить сумму и ставку без главного оффера
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mt-8" aria-label="Сетка предложений">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-[#5c6570]">
            <span>Найдено {{ offers.length }} предложений</span>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="(offer, index) in sortedOffers"
              :key="offer.id"
              class="offer-card"
              :style="{ '--stagger': Math.min(index, 7) }"
            >
              <div class="flex h-16 items-center justify-start">
                <OfferLogo :logo="offer.logo" :name="offer.name"
                           size="md" />
              </div>
              <p class="mt-5 text-2xl font-bold tracking-[-0.03em] tabular-nums">
                До {{ formatAmount(offer.max_loan) }} ₽
              </p>
              <p class="mt-1 min-h-5 text-sm font-semibold text-[#3d4550]">
                <template v-if="offer.is_first_nopercentage === '1'">0% новым клиентам</template>
                <template v-else>&nbsp;</template>
              </p>
              <dl>
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
                class="cta"
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
.design-ten {
  font-family: 'Nunito Sans', ui-sans-serif, system-ui, sans-serif;
  background: #eef1f4;
}

.design-ten :deep(select) {
  border-color: #cfd5dd;
  color: #1a1d23;
}

.offer-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.35rem;
  border: 1px solid rgb(26 29 35 / 0.1);
  border-radius: 12px;
  background: #f7f8fa;
}

.offer-card dl {
  display: grid;
  gap: 0.7rem;
  margin-top: 1.15rem;
  margin-bottom: 1.25rem;
}

.offer-card dl > div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.offer-card dt {
  color: #5c6570;
  font-size: 0.8125rem;
}

.offer-card dd {
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.cta {
  display: inline-flex;
  min-height: 3rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
  padding: 0 1.15rem;
  border-radius: 12px;
  background: #1a1d23;
  color: #f7f8fa;
  font-weight: 700;
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}

.cta:active {
  transform: scale(0.97);
}

.cta:focus-visible {
  outline: 2px solid #1a1d23;
  outline-offset: 2px;
}

@media (hover: hover) and (pointer: fine) {
  .offer-card {
    transition: border-color 180ms ease;
  }

  .offer-card:hover {
    border-color: rgb(26 29 35 / 0.28);
  }

  .cta:hover {
    background: #2c313a;
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

.design-ten ::selection {
  background: #d5dbe3;
  color: #1a1d23;
}
</style>
