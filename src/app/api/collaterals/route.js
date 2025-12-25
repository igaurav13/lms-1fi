import { prisma } from "@/lib/prisma";

/**
 * Attach Collateral to Loan Application
 */
export async function POST(req) {
  try {
    const body = await req.json();

    const required = [
      "loanApplicationId",
      "fundName",
      "isin",
      "unitsPledged",
      "nav"
    ];

    for (const field of required) {
      if (body[field] == null) {
        return Response.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const app = await prisma.loanApplication.findUnique({
      where: { id: body.loanApplicationId }
    });

    if (!app) {
      return Response.json(
        { error: "Loan application not found" },
        { status: 404 }
      );
    }

    const currentValue = body.unitsPledged * body.nav;

    const collateral = await prisma.collateral.create({
      data: {
        loanApplicationId: body.loanApplicationId,
        fundName: body.fundName,
        isin: body.isin,
        unitsPledged: body.unitsPledged,
        nav: body.nav,
        currentValue
      }
    });

    return Response.json(collateral, { status: 201 });

  } catch (err) {
    console.error("Collateral Create Error", err);
    return Response.json(
      { error: "Failed to add collateral" },
      { status: 500 }
    );
  }
}


/**
 * List Collaterals
 */
export async function GET() {
  const collaterals = await prisma.collateral.findMany({
    include: { loanApplication: true },
    orderBy: { createdAt: "desc" }
  });

  return Response.json(collaterals);
}
