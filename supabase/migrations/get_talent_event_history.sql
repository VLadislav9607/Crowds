create or replace function get_talent_event_history(
  p_limit  int default 20,
  p_offset int default 0
)
returns jsonb
language plpgsql
security invoker
as $$
declare
  v_talent_id uuid := auth.uid();
  v_total     int;
  v_rows      jsonb;
begin
  -- total count
  select count(*)
    into v_total
    from event_participations ep
    join events e on e.id = ep.event_id
   where ep.talent_id = v_talent_id
     and ep.status    = 'approved'
     and e.end_at     < now()
     and e.deleted_at is null;

  -- paginated data
  select coalesce(jsonb_agg(row_obj), '[]'::jsonb)
    into v_rows
    from (
      select jsonb_build_object(
        'event_id',         e.id,
        'participation_id', ep.id,
        'title',            e.title,
        'brief',            e.brief,
        'category_id',      e.category_id,
        'start_at',         e.start_at,
        'end_at',           e.end_at,
        'payment_amount',   e.payment_amount,
        'payment_mode',     e.payment_mode,
        'location',         jsonb_build_object(
          'city',              el.city,
          'country',           el.country,
          'formatted_address', el.formatted_address,
          'timezone',          el.timezone
        ),
        'brand_name',       b.name,
        'brand_logo_path',  b.logo_path
      ) as row_obj
        from event_participations ep
        join events e  on e.id  = ep.event_id
        left join event_locations el on el.event_id = e.id
        left join offices o  on o.id  = e.office_id
        left join brands  b  on b.id  = o.brand_id
       where ep.talent_id = v_talent_id
         and ep.status    = 'approved'
         and e.end_at     < now()
         and e.deleted_at is null
       order by e.end_at desc
       limit p_limit
      offset p_offset
    ) sub;

  return jsonb_build_object(
    'data', v_rows,
    'meta', jsonb_build_object(
      'offset',      p_offset,
      'limit',       p_limit,
      'total_count', v_total
    )
  );
end;
$$;
