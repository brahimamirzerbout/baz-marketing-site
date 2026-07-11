-- BAZ RLS Policies v2 — run in SQL Editor for project uyqgmdrzyapbbvmaumvk
-- Idempotent: drops existing policies first, then creates them.
--
-- Rationale: BAZ uses local cookie-based auth (SQLite) for operator access.
-- Supabase authenticated users (anon/public session) should NOT have blanket
-- access to operator tables. Service role (backend only) handles writes.
-- Public users retain INSERT-only access to lead/feedback submissions.

-- Leads
DROP POLICY IF EXISTS "Public can submit leads" ON leads;
CREATE POLICY "Public can submit leads" ON leads FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Operators can read leads" ON leads;
CREATE POLICY "Operators can read leads" ON leads FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Operators can update leads" ON leads;
CREATE POLICY "Operators can update leads" ON leads FOR UPDATE TO service_role USING (true);
DROP POLICY IF EXISTS "Operators can delete leads" ON leads;
CREATE POLICY "Operators can delete leads" ON leads FOR DELETE TO service_role USING (true);

-- Users
DROP POLICY IF EXISTS "Users can read profiles" ON users;
CREATE POLICY "Users can read profiles" ON users FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO service_role USING (true);

-- Customers
DROP POLICY IF EXISTS "Operators can read customers" ON customers;
CREATE POLICY "Operators can read customers" ON customers FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Operators can write customers" ON customers;
CREATE POLICY "Operators can write customers" ON customers FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Projects
DROP POLICY IF EXISTS "Operators can read projects" ON projects;
CREATE POLICY "Operators can read projects" ON projects FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Operators can write projects" ON projects;
CREATE POLICY "Operators can write projects" ON projects FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Subscriptions
DROP POLICY IF EXISTS "Operators can manage subscriptions" ON subscriptions;
CREATE POLICY "Operators can manage subscriptions" ON subscriptions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Invoices
DROP POLICY IF EXISTS "Operators can manage invoices" ON invoices;
CREATE POLICY "Operators can manage invoices" ON invoices FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Orgs
DROP POLICY IF EXISTS "Operators can manage orgs" ON orgs;
CREATE POLICY "Operators can manage orgs" ON orgs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Feedback
DROP POLICY IF EXISTS "Public can submit feedback" ON feedback;
CREATE POLICY "Public can submit feedback" ON feedback FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Operators can read feedback" ON feedback;
CREATE POLICY "Operators can read feedback" ON feedback FOR SELECT TO service_role USING (true);

-- Feedback requests
DROP POLICY IF EXISTS "Operators can manage feedback_requests" ON feedback_requests;
CREATE POLICY "Operators can manage feedback_requests" ON feedback_requests FOR ALL TO service_role USING (true) WITH CHECK (true);

-- AI jobs
DROP POLICY IF EXISTS "Operators can manage ai_jobs" ON ai_jobs;
CREATE POLICY "Operators can manage ai_jobs" ON ai_jobs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Sessions
DROP POLICY IF EXISTS "Operators can manage sessions" ON sessions;
CREATE POLICY "Operators can manage sessions" ON sessions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Audit
DROP POLICY IF EXISTS "Operators can read audit" ON audit;
CREATE POLICY "Operators can read audit" ON audit FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Operators can insert audit" ON audit;
CREATE POLICY "Operators can insert audit" ON audit FOR INSERT TO service_role WITH CHECK (true);
