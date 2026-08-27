<script setup lang="ts">
import '@fontsource/onest/400.css';
import '@fontsource/onest/600.css';
import '@fontsource/onest/700.css';
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
    THESIS: Each offer is a two-page passbook spread. Refuses portrait tiles and row tables.
    OWN-WORLD: Slate cloth, graphite ink, Onest, 12px radius, bound gutter, no shadow cards.
    STORY: Visitor reads amount on the left leaf, checks three terms on the right, leaves to the MFO.
    FIRST VIEWPORT: Left title, count and sort, stacked full-width spreads, CTA on the recto.
    FORM: Passbook spread, seed 9ffa3872 index 6.
    FINISH: unreviewed and undocumented is unfinished; this build ends with
    the finish review, the verdict, DESIGN.md, and every shipping raster
    carrying its provenance
  -->
  <div class="design-eight min-h-[100dvh] text-[#1c2430]">
    <main class="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
          Сравните предложения по одному развороту
        </h1>
        <p class="mt-4 max-w-[44ch] text-lg leading-7 text-[#5d6a7a]">
          Сумма отдельно от срока и ставки. Оформление продолжается на сайте МФО
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mt-8" aria-label="Развороты предложений">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-[#5d6a7a]">
            <span>Найдено {{ offers.length }} предложений</span>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="mt-5 space-y-4">
            <article
              v-for="(offer, index) in sortedOffers"
              :key="offer.id"
              class="book"
              :style="{ '--stagger': Math.min(index, 7) }"
            >
              <div class="leaf leaf--verso">
                <div class="flex h-16 items-center justify-start">
                  <OfferLogo :logo="offer.logo" :name="offer.name"
                             size="md" />
                </div>
                <p class="mt-6 text-sm text-[#5d6a7a]">Сумма</p>
                <p class="mt-1 text-3xl font-bold tracking-[-0.03em] tabular-nums md:text-[2rem]">
                  До {{ formatAmount(offer.max_loan) }} ₽
                </p>
                <p class="mt-2 min-h-5 text-sm font-semibold text-[#2c3848]">
                  <template v-if="offer.is_first_nopercentage === '1'">0% новым клиентам</template>
                  <template v-else>&nbsp;</template>
                </p>
              </div>

              <div class="gutter" aria-hidden="true" />

              <div class="leaf leaf--recto">
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
                  class="cta mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl
                    bg-[#2c3848] px-5 font-semibold text-white focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-[#2c3848]"
                >
                  Перейти на сайт
                  <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
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
.design-eight {
  font-family: Onest, ui-sans-serif, system-ui, sans-serif;
  background: #dfe3ea;
}

.design-eight :deep(select) {
  border-color: #c3cad4;
  color: #1c2430;
}

.book {
  display: grid;
  overflow: hidden;
  border: 1px solid rgb(28 36 48 / 0.12);
  border-radius: 12px;
  background: #f4f6f8;
  grid-template-columns: 1fr;
}

.gutter {
  height: 1px;
  background:
    repeating-linear-gradient(
      90deg,
      #b8c0cc 0 6px,
      transparent 6px 12px
    );
}

.leaf {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 1.25rem 1.35rem;
}

.leaf--recto {
  justify-content: center;
}

.leaf--recto dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem 1rem;
  margin-bottom: 1.25rem;
}

.leaf dt {
  color: #5d6a7a;
  font-size: 0.75rem;
  line-height: 1rem;
}

.leaf dd {
  margin-top: 0.3rem;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1c2430;
}

.cta {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}

.cta:hover {
  background: #1c2430;
}

.cta:active {
  transform: scale(0.97);
}

@media (min-width: 768px) {
  .book {
    grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1.05fr);
  }

  .gutter {
    height: auto;
    background:
      repeating-linear-gradient(
        180deg,
        #b8c0cc 0 6px,
        transparent 6px 12px
      );
    box-shadow:
      -10px 0 16px rgb(28 36 48 / 0.04),
      10px 0 16px rgb(28 36 48 / 0.04);
  }

  .leaf--verso {
    padding-right: 1.75rem;
  }

  .leaf--recto {
    padding-left: 1.75rem;
  }
}

@media (hover: hover) and (pointer: fine) {
  .book {
    transition: border-color 180ms ease;
  }

  .book:hover {
    border-color: rgb(44 56 72 / 0.35);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .book {
    animation: spread-in 280ms cubic-bezier(0.23, 1, 0.32, 1) both;
    animation-delay: calc(var(--stagger, 0) * 40ms);
  }
}

@keyframes spread-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.design-eight ::selection {
  background: #cfd6e0;
  color: #1c2430;
}
</style>
