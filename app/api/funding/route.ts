import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const fundingFilePath = path.join(process.cwd(), "data", "funding.json");

// Ensure the data directory and file exist
function ensureFundingFile() {
  const dataDir = path.join(process.cwd(), "data");
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(fundingFilePath)) {
    const initialData = {
      totalFunding: 465,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(fundingFilePath, JSON.stringify(initialData, null, 2));
  }
}

// GET - Retrieve current funding
export async function GET() {
  try {
    ensureFundingFile();
    const data = fs.readFileSync(fundingFilePath, "utf-8");
    const fundingData = JSON.parse(data);
    
    return NextResponse.json(fundingData);
  } catch (error) {
    console.error("Error reading funding data:", error);
    return NextResponse.json(
      { totalFunding: 465, lastUpdated: new Date().toISOString() },
      { status: 200 }
    );
  }
}

// POST - Update funding (used by webhook)
export async function POST(request: Request) {
  try {
    ensureFundingFile();
    const { amount } = await request.json();
    
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }
    
    // Read current funding
    const data = fs.readFileSync(fundingFilePath, "utf-8");
    const fundingData = JSON.parse(data);
    
    // Add new donation
    fundingData.totalFunding += amount;
    fundingData.lastUpdated = new Date().toISOString();
    
    // Save updated funding
    fs.writeFileSync(fundingFilePath, JSON.stringify(fundingData, null, 2));
    
    console.log(`Funding updated: +$${amount} = $${fundingData.totalFunding}`);
    
    return NextResponse.json(fundingData);
  } catch (error) {
    console.error("Error updating funding data:", error);
    return NextResponse.json(
      { error: "Failed to update funding" },
      { status: 500 }
    );
  }
}