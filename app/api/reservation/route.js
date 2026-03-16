import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      duration,
      service,
      date,
      time,
      pickup,
      destination,
      passengers,
      phone,
      notes,
    } = body;

    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          name,
          duration,
          service,
          date,
          time,
          pickup,
          destination,
          passengers: passengers ? Number(passengers) : null,
          phone,
          notes,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to submit reservation" },
      { status: 500 }
    );
  }
}
