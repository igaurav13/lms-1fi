import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.loanId || !body.amount) {
      return Response.json(
        { error: "loanId and amount are required" },
        { status: 400 }
      );
    }

    const loan = await prisma.loan.findUnique({
      where: { id: body.loanId }
    });

    if (!loan) {
      return Response.json(
        { error: "Loan not found" },
        { status: 404 }
      );
    }

    if (loan.status !== "ACTIVE") {
      return Response.json(
        { error: "Repayment allowed only on ACTIVE loans" },
        { status: 400 }
      );
    }

    const newOutstanding = loan.outstanding - body.amount;

    const updatedLoan = await prisma.loan.update({
      where: { id: loan.id },
      data: {
        outstanding: newOutstanding < 0 ? 0 : newOutstanding,
        status: newOutstanding <= 0 ? "CLOSED" : loan.status
      }
    });

    return Response.json({
      message: "Repayment recorded",
      repaidAmount: body.amount,
      outstandingBefore: loan.outstanding,
      outstandingAfter: updatedLoan.outstanding,
      status: updatedLoan.status
    });

  } catch (err) {
    console.error("Repayment Error", err);
    return Response.json(
      { error: "Failed to process repayment" },
      { status: 500 }
    );
  }
}
