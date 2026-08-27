export interface Offer {
  id: string
  logo: string
  name: string
  max_loan: string
  offer_type: string
  partner_id: string
  percentage: string
  variant_id: string
  loan_length_max: string
  loan_length_min: string
  approved_age_max: string
  approved_age_min: string
  link: string
  is_first_nopercentage?: string
}

export type SortType = 'default' | 'amount' | 'term';
