import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { endpoint, ...body } = await request.json()

    const response = await fetch(`https://api.groq.com/openai/v1${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Groq API Error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
