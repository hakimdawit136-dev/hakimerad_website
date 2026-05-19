import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const gender = formData.get("gender") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    // Get uploaded images
    const images: File[] = [];
    for (let i = 0; i < 3; i++) {
      const image = formData.get(`image${i}`) as File;
      if (image) {
        images.push(image);
      }
    }

    if (images.length === 0) {
      return NextResponse.json({ message: "At least one image is required" }, { status: 400 });
    }

    if (images.length > 3) {
      return NextResponse.json({ message: "Maximum 3 images allowed" }, { status: 400 });
    }

    // Validate image types
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    for (const image of images) {
      if (!validTypes.includes(image.type)) {
        return NextResponse.json({ message: "Only .JPEG and .PNG files are allowed" }, { status: 400 });
      }
    }

    // Create patient record
    const patientResult = await query(
      `INSERT INTO patients (user_id, first_name, last_name, date_of_birth, gender, phone, address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [session.user.id, firstName, lastName, dateOfBirth || null, gender || null, phone || null, address || null]
    ) as any;

    const patientId = patientResult.insertId;

    // Create medical case
    const caseNumber = `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const caseResult = await query(
      `INSERT INTO medical_cases (patient_id, case_number, status)
       VALUES (?, ?, 'SUBMITTED')`,
      [patientId, caseNumber]
    ) as any;

    const caseId = caseResult.insertId;

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "medical-images");
    await mkdir(uploadsDir, { recursive: true });

    // Save images and create database records
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const fileExtension = image.type === "image/png" ? "png" : "jpg";
      const fileName = `${randomBytes(16).toString('hex')}.${fileExtension}`;
      const filePath = join(uploadsDir, fileName);
      
      await writeFile(filePath, buffer);
      
      const imageType = image.type === "image/png" ? "PNG" : "JPEG";
      
      await query(
        `INSERT INTO medical_images (case_id, image_path, image_name, image_type)
         VALUES (?, ?, ?, ?)`,
        [caseId, `/uploads/medical-images/${fileName}`, image.name, imageType]
      );
    }

    return NextResponse.json({ 
      message: "Case submitted successfully",
      caseId,
      caseNumber
    });

  } catch (error) {
    console.error("Error submitting case:", error);
    return NextResponse.json({ message: "Failed to submit case" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cases = await query(
      `SELECT mc.*, p.first_name, p.last_name, p.date_of_birth, p.gender, p.phone
       FROM medical_cases mc
       JOIN patients p ON mc.patient_id = p.id
       WHERE p.user_id = ?
       ORDER BY mc.submission_date DESC`,
      [session.user.id]
    );

    return NextResponse.json({ cases });

  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ message: "Failed to fetch cases" }, { status: 500 });
  }
}
