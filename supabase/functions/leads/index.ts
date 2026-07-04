import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (req.method === "POST") {
      const body = await req.json();
      const { data, error } = await supabase.from("leads").insert({
        name: body.name,
        email: body.email,
        company: body.company || null,
        message: body.message || null,
        source: body.source || "edge_fn",
        service: body.service || "",
      }).select().single();

      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, id: data.id }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, leads: data }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
});
