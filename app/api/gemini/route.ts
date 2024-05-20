import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(request: NextRequest, response: NextResponse) {
  const vals = await request.json();
  const prompt = vals;
  const result = await model.generateContent(prompt);
  const resp = await result.response;
  const text = resp.text();
  return NextResponse.json(text);
}

export async function GET() {
  return Response.json("hi");
}
