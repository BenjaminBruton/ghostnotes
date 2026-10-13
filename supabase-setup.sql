-- Create funding table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS funding (
  id BIGSERIAL PRIMARY KEY,
  total_funding DECIMAL(10, 2) NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert initial funding amount
INSERT INTO funding (total_funding, last_updated)
VALUES (470.00, NOW());

-- Create index for faster queries
CREATE INDEX idx_funding_id_desc ON funding (id DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE funding ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access" ON funding
  FOR SELECT
  USING (true);

-- Policy: Allow service role to insert
CREATE POLICY "Allow service role insert" ON funding
  FOR INSERT
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON funding TO anon, authenticated;
GRANT INSERT ON funding TO service_role;