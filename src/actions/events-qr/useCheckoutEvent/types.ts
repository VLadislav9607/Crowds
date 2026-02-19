export interface CheckoutEventBodyDto {
  session_id: string;
}

export interface CheckoutEventResDto {
  id: string;
  checked_in_at: string;
  checked_out_at: string;
}
