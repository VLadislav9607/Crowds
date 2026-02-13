export interface UseGetOrgEventsCountersBodyDto {
  brand_id: string;
}

export interface UseGetOrgEventsCountersRespDto {
  active: number;
  active_public: number;
  active_private: number;
  upcoming: number;
  past: number;
  draft: number;
  upcoming_public: number;
  upcoming_private: number;
}
