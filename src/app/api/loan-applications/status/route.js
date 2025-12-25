import { prisma } from "@/lib/prisma";

const VALID_STATUSES = [
  "DRAFT",
  "ELIGIBLE",
  "APPROVED",
  "REJECTED",
  "DISBURSED"
];

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.id || !body.status) {
      return Response.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(body.status)) {
      return Response.json(
        { error: "Invalid status transition" },
        { status: 400 }
      );
    }

    const app = await prisma.loanApplication.update({
      where: { id: body.id },
      data: { status: body.status }
    });

    return Response.json(app);

  } catch (err) {
    console.error("Status Update Error", err);
    return Response.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
