import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.loanApplicationId || !body.principal) {
      return Response.json(
        { error: "loanApplicationId and principal are required" },
        { status: 400 }
      );
    }

    const app = await prisma.loanApplication.findUnique({
      where: { id: body.loanApplicationId },
      include: { loanProduct: true }
    });

    if (!app) {
      return Response.json(
        { error: "Loan application not found" },
        { status: 404 }
      );
    }

    if (app.status !== "APPROVED") {
      return Response.json(
        { error: "Application must be APPROVED before creating loan" },
        { status: 400 }
      );
    }

    const loan = await prisma.loan.create({
      data: {
        loanApplicationId: app.id,
        principal: body.principal,
        outstanding: body.principal,
        interestAccrued: 0,
        currentLTV: 0,
        status: "ACTIVE"
      }
    });

    // Move application → DISBURSED
    await prisma.loanApplication.update({
      where: { id: app.id },
      data: { status: "DISBURSED" }
    });

    return Response.json(loan, { status: 201 });

  } catch (err) {
    console.error("Loan Create Error", err);
    return Response.json(
      { error: "Failed to create loan" },
      { status: 500 }
    );
  }
}
