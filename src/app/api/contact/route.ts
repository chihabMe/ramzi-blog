import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { ContactFormData } from "@/sanity/types";

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create contact document in Sanity
    const contactDoc = {
      _type: "contact",
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      isRead: false,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    const result = await client.create(contactDoc);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        id: result._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again later." },
      { status: 500 }
    );
  }
}

// GET method to retrieve contact messages (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = `*[_type == "contact"`;

    if (status) {
      query += ` && status == "${status}"`;
    }

    query += `] | order(submittedAt desc) [${offset}...${offset + limit}] {
      _id,
      name,
      email,
      subject,
      message,
      isRead,
      submittedAt,
      status
    }`;

    const messages = await client.fetch(query);

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

// PATCH method to update message status (for admin use)
export async function PATCH(request: NextRequest) {
  try {
    const { id, isRead, status } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (typeof isRead === "boolean") updateData.isRead = isRead;
    if (status) updateData.status = status;

    const result = await client.patch(id).set(updateData).commit();

    return NextResponse.json(
      { success: true, message: "Message updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update contact message:", error);
    return NextResponse.json(
      { error: "Failed to update contact message" },
      { status: 500 }
    );
  }
}
