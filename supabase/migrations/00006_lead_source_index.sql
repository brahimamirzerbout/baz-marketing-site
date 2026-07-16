-- Add index on source for permission-asset filtering (refocus signups, etc.)
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
