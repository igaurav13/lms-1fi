import { prisma } from "@/lib/prisma";

/**
 * POST /api/eligibility
 * Calculate eligible loan amount for application
 */
export async function POST(req) {
  const body = await req.json();

  const application = await prisma.loanApplication.findUnique({
    where: { id: body.loanApplicationId },
    include: {
      loanProduct: true,
      collaterals: true,
    },
  });

  if (!application) {
    return Response.json(
      { error: "Loan application not found" },
      { status: 404 }
    );
  }

  const totalCollateralValue = application.collaterals.reduce(
    (sum, c) => sum + c.currentValue,
    0
  );

  const eligibleAmount = (totalCollateralValue * application.loanProduct.maxLTV) / 100;

  await prisma.loanApplication.update({
    where: { id: application.id },
    data: {
      eligibleAmount,
      status: "ELIGIBLE",
    },
  });

  return Response.json({
    loanApplicationId: application.id,
    totalCollateralValue,
    maxLTV: application.loanProduct.maxLTV,
    eligibleAmount,
  });
}
