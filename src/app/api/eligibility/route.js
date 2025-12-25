import { prisma } from "@/lib/prisma";

/**
 * Runs eligibility against pledged MF collateral
 */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.loanApplicationId) {
      return Response.json(
        { error: "loanApplicationId is required" },
        { status: 400 }
      );
    }

    const application = await prisma.loanApplication.findUnique({
      where: { id: body.loanApplicationId },
      include: {
        loanProduct: true,
        collaterals: true
      }
    });

    if (!application) {
      return Response.json(
        { error: "Loan application not found" },
        { status: 404 }
      );
    }

    if (!application.collaterals.length) {
      return Response.json(
        { error: "No collateral pledged yet" },
        { status: 400 }
      );
    }

    // total collateral NAV value
    const collateralValue = application.collaterals.reduce(
      (sum, c) => sum + c.currentValue,
      0
    );

    const eligibleAmount = collateralValue * application.loanProduct.maxLTV;

    // persist eligibility result
    const updated = await prisma.loanApplication.update({
      where: { id: application.id },
      data: {
        eligibleAmount,
        status: "ELIGIBLE"
      }
    });

    return Response.json({
      collateralValue,
      maxLTV: application.loanProduct.maxLTV,
      eligibleAmount,
      application: updated
    });

  } catch (err) {
    console.error("Eligibility Error", err);

    return Response.json(
      { error: "Failed to compute eligibility" },
      { status: 500 }
    );
  }
}
