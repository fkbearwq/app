import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();

  const { name, duration, service, date, time, pickup, destination, passengers, phone, notes } = body;
  
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        name，
        duration，
        service,
        date,
        time,
        pickup,
        destination,
        passengers,
        phone,
        notes
      }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
