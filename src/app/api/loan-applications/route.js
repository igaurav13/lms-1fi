import { prisma } from "@/lib/prisma";

/**
 * Create Loan Application
 * Used by dashboard + fintech partner APIs
 */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.borrowerId || !body.loanProductId || !body.requestedAmount) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate borrower
    const borrower = await prisma.borrower.findUnique({
      where: { id: body.borrowerId }
    });

    if (!borrower) {
      return Response.json(
        { error: "Borrower not found" },
        { status: 404 }
      );
    }

    // Validate loan product
    const product = await prisma.loanProduct.findUnique({
      where: { id: body.loanProductId }
    });

    if (!product) {
      return Response.json(
        { error: "Loan product not found" },
        { status: 404 }
      );
    }

    const application = await prisma.loanApplication.create({
      data: {
        borrowerId: body.borrowerId,
        loanProductId: body.loanProductId,
        requestedAmount: body.requestedAmount,
        eligibleAmount: null,
        status: "DRAFT"
      }
    });

    return Response.json(application, { status: 201 });

  } catch (err) {
    console.error("Loan Application Create Error", err);
    return Response.json(
      { error: "Failed to create loan application" },
      { status: 500 }
    );
  }
}


/**
 * List Loan Applications (Ops View)
 */
export async function GET() {
  const applications = await prisma.loanApplication.findMany({
    include: {
      borrower: true,
      loanProduct: true,
      collaterals: true,
      loan: true
    },
    orderBy: { createdAt: "desc" }
  });

  return Response.json(applications);
}
