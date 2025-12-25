import { prisma } from "@/lib/prisma";

/**
 * POST /api/loan-applications
 * Create a new loan application (API-FIRST)
 */
export async function POST(req) {
  const body = await req.json();

  const application = await prisma.loanApplication.create({
    data: {
      borrowerId: body.borrowerId,
      loanProductId: body.loanProductId,
      requestedAmount: body.requestedAmount,
      status: "DRAFT",
    },
  });

  return Response.json(application, { status: 201 });
}

/**
 * GET /api/loan-applications
 * Ops view – list all applications
 */
export async function GET() {
  const applications = await prisma.loanApplication.findMany({
    include: {
      borrower: true,
      loanProduct: true,
      collaterals: true,
      loan: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(applications);
}
