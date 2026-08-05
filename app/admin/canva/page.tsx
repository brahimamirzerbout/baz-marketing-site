import { requireAdmin } from "@/lib/admin-guard";
import CanvaClient from "./CanvaClient";

export const metadata = {
  title: "Canva — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Server-side gate: close the last AUDIT 1.2 gap — /admin/canva was a client-only
// gate (fetch /api/auth/me) with no server guard, so a forged baz_session cookie
// passed the middleware format-check and reached the client bundle. Now the server
// component enforces requireAdmin() before rendering, matching /admin/integrations.
export default async function CanvaPage() {
  await requireAdmin({ nextPath: "/admin/canva" });
  return <CanvaClient />;
}