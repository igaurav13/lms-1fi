import { prisma } from "@/lib/prisma";

/**
 * Create Borrower
 */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.pan || !body.mobile || !body.email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const borrower = await prisma.borrower.create({
      data: {
        fullName: body.fullName,
        pan: body.pan,
        mobile: body.mobile,
        email: body.email,
        kycStatus: "PENDING"
      }
    });

    return Response.json(borrower, { status: 201 });

  } catch (err) {
    if (err.code === "P2002") {
      return Response.json(
        { error: "Borrower with this PAN already exists" },
        { status: 409 }
      );
    }

    console.error("Borrower Create Error", err);
    return Response.json({ error: "Failed to create borrower" }, { status: 500 });
  }
}


/**
 * List Borrowers
 */
export async function GET() {
  const borrowers = await prisma.borrower.findMany({
    orderBy: { createdAt: "desc" }
  });

  return Response.json(borrowers);
}
