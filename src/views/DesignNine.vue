<script setup lang="ts">
import '@fontsource/geologica/400.css';
import '@fontsource/geologica/600.css';
import '@fontsource/geologica/700.css';
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
    THESIS: Offers as timetable rows, not receipt cards or bound spreads.
    OWN-WORLD: Cool grey board, brick ink, Geologica, 12px CTA, hairline rows, no cards.
    STORY: Visitor scans amount in a line with rate, then leaves on the brick button.
    FIRST VIEWPORT: Left title, count and sort, full-width strips, CTA at the row end.
    FORM: Light timetable strips, replacement of the receipt world.
    FINISH: unreviewed and undocumented is unfinished; this build ends with
    the finish review, the verdict, DESIGN.md, and every shipping raster
    carrying its provenance
  -->
  <div class="design-nine min-h-[100dvh] text-[#1f1714]">
    <main class="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
      <section class="max-w-3xl">
        <h1 class="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
          Сравните предложения по строкам
        </h1>
        <p class="mt-4 max-w-[44ch] text-lg leading-7 text-[#6b5c57]">
          Сумма, ставка и переход в одной линии. Оформление на сайте МФО
        </p>
      </section>

      <OffersState :loading="loading" :error="error"
                   @retry="loadOffers">
        <section class="mt-8" aria-label="Строки предложений">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-[#6b5c57]">
            <span>Найдено {{ offers.length }} предложений</span>
            <SortControl v-model="sortType" variant="outlined" />
          </div>

          <div class="board mt-5">
            <article
              v-for="(offer, index) in sortedOffers"
              :key="offer.id"
              class="strip"
              :style="{ '--stagger': Math.min(index, 7) }"
            >
              <div class="logo-cell">
                <OfferLogo :logo="offer.logo" :name="offer.name"
                           size="md" />
              </div>
              <div class="sum-cell">
                <p class="amount">До {{ formatAmount(offer.max_loan) }} ₽</p>
                <p class="flag">
                  <template v-if="offer.is_first_nopercentage === '1'">0% новым клиентам</template>
                  <template v-else>&nbsp;</template>
                </p>
              </div>
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
.design-nine {
  font-family: Geologica, ui-sans-serif, system-ui, sans-serif;
  background: #eef0f3;
}

.design-nine :deep(select) {
  border-color: #c9ced6;
  color: #1f1714;
}

.board {
  border-top: 1px solid #d5d9e0;
}

.strip {
  display: grid;
  gap: 1rem 1.25rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid #d5d9e0;
  align-items: center;
}

.logo-cell {
  display: flex;
  min-height: 3rem;
  align-items: center;
}

.amount {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.flag {
  min-height: 1.25rem;
  margin-top: 0.2rem;
  color: #8f3d2c;
  font-size: 0.8125rem;
  font-weight: 600;
}

.strip dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.strip dt {
  color: #6b5c57;
  font-size: 0.75rem;
}

.strip dd {
  margin-top: 0.25rem;
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
  padding: 0 1.15rem;
  border-radius: 12px;
  background: #8f3d2c;
  color: #f7f1ee;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}

.cta:hover {
  background: #732f22;
}

.cta:active {
  transform: scale(0.97);
}

.cta:focus-visible {
  outline: 2px solid #8f3d2c;
  outline-offset: 2px;
}

@media (min-width: 1024px) {
  .strip {
    grid-template-columns: minmax(10rem, 0.9fr) minmax(9rem, 1fr) minmax(16rem, 1.3fr) 12.5rem;
  }

  .cta {
    width: auto;
  }
}

@media (hover: hover) and (pointer: fine) {
  .strip {
    transition: background-color 180ms ease;
  }

  .strip:hover {
    background: rgb(31 23 20 / 0.03);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .strip {
    animation: row-in 280ms cubic-bezier(0.23, 1, 0.32, 1) both;
    animation-delay: calc(var(--stagger, 0) * 40ms);
  }
}

@keyframes row-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.design-nine ::selection {
  background: #ead8d2;
  color: #1f1714;
}
</style>
