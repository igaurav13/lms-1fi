import { prisma } from "@/lib/prisma";

/**
 * Create Loan Product (NBFC defines LAMF risk configuration)
 */
export async function POST(req) {
  try {
    const body = await req.json();

    const required = [
      "name",
      "interestRate",
      "maxLTV",
      "marginCallLTV",
      "liquidationLTV",
      "minLoanAmount",
      "maxLoanAmount"
    ];

    for (const field of required) {
      if (body[field] == null) {
        return Response.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // LTV thresholds must increase with risk severity
    if( body.maxLTV <= 0 || body.maxLTV >= 1 ||
        body.marginCallLTV <= 0 || body.marginCallLTV >= 1 ||
        body.liquidationLTV <= 0 || body.liquidationLTV >= 1 ||
        !(body.maxLTV < body.marginCallLTV && body.marginCallLTV < body.liquidationLTV)
      ) {
        return Response.json(
          { error: "Invalid LTV configuration — expected maxLTV < marginCallLTV < liquidationLTV" },
          { status: 400 }
        );
    }


    const product = await prisma.loanProduct.create({
      data: {
        name: body.name,
        interestRate: body.interestRate,
        maxLTV: body.maxLTV,
        marginCallLTV: body.marginCallLTV,
        liquidationLTV: body.liquidationLTV,
        minLoanAmount: body.minLoanAmount,
        maxLoanAmount: body.maxLoanAmount,
        status: "ACTIVE"
      }
    });

  return Response.json(product, { status: 201 });

  } catch (err) {
    console.error("Loan Product Create Error", err);
    return Response.json(
      { error: "Failed to create loan product" },
      { status: 500 }
    );
  }
}


export async function GET() {
  const products = await prisma.loanProduct.findMany({
    orderBy: { createdAt: "desc" }
  });

  return Response.json(products);
}
