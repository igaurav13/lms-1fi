import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.loanId) {
      return Response.json(
        { error: "loanId is required" },
        { status: 400 }
      );
    }

    const loan = await prisma.loan.findUnique({
      where: { id: body.loanId },
      include: {
        loanApplication: {
          include: {
            collaterals: true,
            loanProduct: true
          }
        }
      }
    });

    if (!loan) {
      return Response.json(
        { error: "Loan not found" },
        { status: 404 }
      );
    }

    const totalCollateralValue = loan.loanApplication.collaterals
      .reduce((sum, c) => sum + c.currentValue, 0);

    const currentLTV =
      loan.outstanding / totalCollateralValue;

    const updatedLoan = await prisma.loan.update({
      where: { id: loan.id },
      data: { currentLTV }
    });

    return Response.json({
      loanId: loan.id,
      outstanding: loan.outstanding,
      totalCollateralValue,
      currentLTV,
      productThresholds: {
        maxLTV: loan.loanApplication.loanProduct.maxLTV,
        marginCallLTV: loan.loanApplication.loanProduct.marginCallLTV,
        liquidationLTV: loan.loanApplication.loanProduct.liquidationLTV
      },
      loan: updatedLoan
    });

  } catch (err) {
    console.error("LTV Recalc Error", err);
    return Response.json(
      { error: "Failed to recalculate LTV" },
      { status: 500 }
    );
  }
}
