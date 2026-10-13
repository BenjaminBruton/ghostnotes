import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "../../../lib/supabase";

// GET - Retrieve current funding from Supabase
export async function GET() {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn("⚠️ Supabase not configured. Returning default funding amount.");
      return NextResponse.json({
        totalFunding: 470,
        lastUpdated: new Date().toISOString(),
      });
    }

    const { data, error } = await supabase
      .from('funding')
      .select('total_funding, last_updated')
      .order('id', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.error("Supabase error:", error);
      // Return default if no record exists yet
      return NextResponse.json({
        totalFunding: 470,
        lastUpdated: new Date().toISOString(),
      });
    }
    
    return NextResponse.json({
      totalFunding: parseFloat(data.total_funding),
      lastUpdated: data.last_updated,
    });
  } catch (error) {
    console.error("Error reading funding from database:", error);
    return NextResponse.json({
      totalFunding: 470,
      lastUpdated: new Date().toISOString(),
    });
  }
}

// POST - Update funding in Supabase (used by webhook)
export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn("⚠️ Supabase not configured. Cannot persist funding update.");
      console.log(`Would have added: +$${amount}`);
      return NextResponse.json({
        totalFunding: 470 + amount,
        lastUpdated: new Date().toISOString(),
        warning: "Supabase not configured - update not persisted"
      });
    }
    
    // Get current funding total
    const { data: currentData, error: fetchError } = await supabase
      .from('funding')
      .select('total_funding')
      .order('id', { ascending: false })
      .limit(1)
      .single();
    
    const currentTotal = currentData ? parseFloat(currentData.total_funding) : 470;
    const newTotal = currentTotal + amount;
    
    // Insert new funding record
    const { error: insertError } = await supabase
      .from('funding')
      .insert([{
        total_funding: newTotal,
        last_updated: new Date().toISOString(),
      }]);
    
    if (insertError) {
      console.error("Error inserting funding:", insertError);
      return NextResponse.json(
        { error: "Failed to update funding" },
        { status: 500 }
      );
    }
    
    console.log(`✅ Funding updated in Supabase: +$${amount} = $${newTotal}`);
    
    return NextResponse.json({
      totalFunding: newTotal,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating funding in database:", error);
    return NextResponse.json(
      { error: "Failed to update funding" },
      { status: 500 }
    );
  }
}