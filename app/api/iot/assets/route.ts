import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .schema("iot")
    .from("assets")
    .select("*, locations(name)")
    .order("createdAtUTC", { ascending: false });

  console.log("TEST ERROR:", error);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase.schema("iot").from("assets").insert(body);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
