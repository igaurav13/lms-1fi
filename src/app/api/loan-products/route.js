import { prisma } from "@/lib/prisma";

/**
 * POST /api/loan-products
 * NBFC creates a LAMF product
 */
export async function POST(req) {
  const body = await req.json();

  if (
    !body.name ||
    !body.maxLTV ||
    !body.marginCallLTV ||
    !body.liquidationLTV
  ) {
    return Response.json(
      { error: "Missing required fields" },
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
    },
  });

  return Response.json(product, { status: 201 });
}

/**
 * GET /api/loan-products
 */
export async function GET() {
  const products = await prisma.loanProduct.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(products);
}
