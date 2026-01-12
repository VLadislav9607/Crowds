export interface UseGetOrgEventsCountersBodyDto {
  organization_id: string;
}

export interface UseGetOrgEventsCountersRespDto {
  active: number;
  upcoming: number;
  past: number;
  draft: number;
  upcoming_public: number;
  upcoming_private: number;
}
