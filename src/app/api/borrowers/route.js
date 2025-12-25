export async function POST(req) {
  const body = await req.json();

  if (!body.fullName || !body.pan || !body.mobile) {
    return Response.json(
      { error: "fullName, pan, mobile are required" },
      { status: 400 }
    );
  }

  try {
    const borrower = await prisma.borrower.create({
      data: {
        fullName: body.fullName,
        pan: body.pan,
        mobile: body.mobile,
        email: body.email,
      },
    });

    return Response.json(borrower, { status: 201 });
  } catch (e) {
    return Response.json(
      { error: "Borrower with this PAN already exists" },
      { status: 409 }
    );
  }
}
