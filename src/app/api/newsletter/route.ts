import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/sanity";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const result = await subscribeToNewsletter({
      email: email.trim(),
      source: "website",
    });

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while subscribing. Please try again later.",
      },
      { status: 500 }
    );
  }
}
