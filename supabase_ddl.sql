
CREATE TABLE IF NOT EXISTS public.kpi_settings (
  id integer PRIMARY KEY,
  ad_spend float,
  blended_cpl float,
  conversion_rate float,
  iqi_floor float
);

-- Note: Depending on RLS policies, you might need to enable anon access.
ALTER TABLE public.kpi_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for anon" ON public.kpi_settings FOR ALL USING (true);
