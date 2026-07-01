-- BAZ RLS Policies — run in SQL Editor for project uyqgmdrzyapbbvmaumvk
-- Idempotent: drops existing policies first, then creates them

-- Leads
DROP POLICY IF EXISTS "Public can submit leads" ON leads;
CREATE POLICY "Public can submit leads" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Operators can read leads" ON leads;
CREATE POLICY "Operators can read leads" ON leads FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Operators can update leads" ON leads;
CREATE POLICY "Operators can update leads" ON leads FOR UPDATE TO authenticated USING (true);
DROP POLICY IF EXISTS "Operators can delete leads" ON leads;
CREATE POLICY "Operators can delete leads" ON leads FOR DELETE TO authenticated USING (true);

-- Users
DROP POLICY IF EXISTS "Users can read profiles" ON users;
CREATE POLICY "Users can read profiles" ON users FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (true);

-- Customers
DROP POLICY IF EXISTS "Operators can read customers" ON customers;
CREATE POLICY "Operators can read customers" ON customers FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Operators can write customers" ON customers;
CREATE POLICY "Operators can write customers" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects
DROP POLICY IF EXISTS "Operators can read projects" ON projects;
CREATE POLICY "Operators can read projects" ON projects FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Operators can write projects" ON projects;
CREATE POLICY "Operators can write projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Subscriptions
DROP POLICY IF EXISTS "Operators can manage subscriptions" ON subscriptions;
CREATE POLICY "Operators can manage subscriptions" ON subscriptions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Invoices
DROP POLICY IF EXISTS "Operators can manage invoices" ON invoices;
CREATE POLICY "Operators can manage invoices" ON invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Orgs
DROP POLICY IF EXISTS "Operators can manage orgs" ON orgs;
CREATE POLICY "Operators can manage orgs" ON orgs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Feedback
DROP POLICY IF EXISTS "Public can submit feedback" ON feedback;
CREATE POLICY "Public can submit feedback" ON feedback FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Operators can read feedback" ON feedback;
CREATE POLICY "Operators can read feedback" ON feedback FOR SELECT TO authenticated USING (true);

-- Feedback requests
DROP POLICY IF EXISTS "Operators can manage feedback_requests" ON feedback_requests;
CREATE POLICY "Operators can manage feedback_requests" ON feedback_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- AI jobs
DROP POLICY IF EXISTS "Operators can manage ai_jobs" ON ai_jobs;
CREATE POLICY "Operators can manage ai_jobs" ON ai_jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Sessions
DROP POLICY IF EXISTS "Operators can manage sessions" ON sessions;
CREATE POLICY "Operators can manage sessions" ON sessions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Audit
DROP POLICY IF EXISTS "Operators can read audit" ON audit;
CREATE POLICY "Operators can read audit" ON audit FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Operators can insert audit" ON audit;
CREATE POLICY "Operators can insert audit" ON audit FOR INSERT TO authenticated WITH CHECK (true);