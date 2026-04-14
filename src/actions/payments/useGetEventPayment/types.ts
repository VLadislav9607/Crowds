export interface EventPaymentDto {
  id: string;
  event_id: string;
  stripe_customer_id: string;
  stripe_payment_intent_id: string | null;
  status: string;
  currency: string;
  talent_budget_cents: number;
  commission_cents: number;
  surcharge_cents: number;
  total_charge_cents: number;
  stripe_fee_cents: number;
  payment_mode: string | null;
  payment_amount_per_unit: number | null;
  total_headcount: number | null;
  event_duration_hours: number | null;
  paid_at: string | null;
  failed_at: string | null;
  created_at: string;
  updated_at: string;
}
