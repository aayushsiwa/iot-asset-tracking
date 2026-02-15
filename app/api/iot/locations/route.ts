import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .schema("iot")
    .from("locations")
    .select("*");

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
