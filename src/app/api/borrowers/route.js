import { prisma } from "@/lib/prisma";

/**
 * POST /api/borrowers
 * Create a borrower (fintech or internal)
 */
export async function POST(req) {
  const body = await req.json();

  const borrower = await prisma.borrower.create({
    data: {
      fullName: body.fullName,
      pan: body.pan,
      mobile: body.mobile,
      email: body.email,
    },
  });

  return Response.json(borrower, { status: 201 });
}

/**
 * GET /api/borrowers
 * List all borrowers (ops use)
 */
export async function GET() {
  const borrowers = await prisma.borrower.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(borrowers);
}
