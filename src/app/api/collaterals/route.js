import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  if (
    !body.loanApplicationId ||
    !body.fundName ||
    !body.unitsPledged ||
    !body.nav
  ) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const currentValue = body.unitsPledged * body.nav;

  const collateral = await prisma.collateral.create({
    data: {
      loanApplicationId: body.loanApplicationId,
      fundName: body.fundName,
      isin: body.isin || "NA",
      unitsPledged: body.unitsPledged,
      nav: body.nav,
      currentValue,
    },
  });

  return Response.json(collateral, { status: 201 });
}
