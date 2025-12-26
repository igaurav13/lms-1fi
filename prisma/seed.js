const { PrismaClient } = require("@prisma/client");
const { randomUUID } = require("crypto");

const prisma = new PrismaClient();

function rand(min, max, precision = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}

async function main() {
  console.log("Resetting database…");

  // Order matters
  await prisma.collateral.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.loanApplication.deleteMany();
  await prisma.borrower.deleteMany();
  await prisma.loanProduct.deleteMany();

  console.log("Seeding loan products…");

  const loanProducts = await prisma.$transaction([
    prisma.loanProduct.create({
      data: {
        name: "Standard Loan",
        interestRate: 12.5,
        maxLTV: 0.6,
        marginCallLTV: 0.7,
        liquidationLTV: 0.8,
        minLoanAmount: 50000,
        maxLoanAmount: 1000000,
      },
    }),
    prisma.loanProduct.create({
      data: {
        name: "High Networth Loan",
        interestRate: 9.8,
        maxLTV: 0.5,
        marginCallLTV: 0.6,
        liquidationLTV: 0.7,
        minLoanAmount: 200000,
        maxLoanAmount: 5000000,
      },
    }),
    prisma.loanProduct.create({
      data: {
        name: "Aggressive Loan",
        interestRate: 15.2,
        maxLTV: 0.7,
        marginCallLTV: 0.8,
        liquidationLTV: 0.9,
        minLoanAmount: 25000,
        maxLoanAmount: 750000,
      },
    }),
    prisma.loanProduct.create({
      data: {
        name: "Deprecated Product",
        interestRate: 11,
        maxLTV: 0.55,
        marginCallLTV: 0.65,
        liquidationLTV: 0.75,
        minLoanAmount: 100000,
        maxLoanAmount: 2000000,
        status: "INACTIVE",
      },
    }),
  ]);

  console.log("Seeding borrowers…");

  const kycStates = ["PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"];

  const borrowers = await Promise.all(
    Array.from({ length: 25 }).map((_, i) =>
      prisma.borrower.create({
        data: {
          fullName: `Borrower ${i + 1}`,
          pan: `ABCDE${1000 + i}F`,
          mobile: `99999${1000 + i}`,
          email: `borrower${i + 1}@mail.com`,
          kycStatus: kycStates[i % kycStates.length],
        },
      })
    )
  );

  console.log("Seeding loan applications + collaterals + loans…");

  const applicationStatuses = [
    "DRAFT",
    "PENDING_KYC",
    "UNDER_REVIEW",
    "APPROVED",
    "REJECTED",
    "DISBURSED",
    "CLOSED",
    "WITHDRAWN",
  ];

  for (const borrower of borrowers) {
    const product =
      loanProducts[Math.floor(Math.random() * loanProducts.length)];

    const requestedAmount = rand(
      product.minLoanAmount * 0.8,
      product.maxLoanAmount * 1.1
    );

    const eligibleAmount = rand(
      product.minLoanAmount,
      product.maxLoanAmount
    );

    const status =
      applicationStatuses[
        Math.floor(Math.random() * applicationStatuses.length)
      ];

    const application = await prisma.loanApplication.create({
      data: {
        borrowerId: borrower.id,
        loanProductId: product.id,
        requestedAmount,
        eligibleAmount: Math.random() > 0.2 ? eligibleAmount : null,
        status,
      },
    });

    // Multiple collaterals — includes edge values
    const collateralCount = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < collateralCount; j++) {
      const nav = rand(10, 500);
      const units = rand(5, 500);
      const value = parseFloat((nav * units).toFixed(2));

      await prisma.collateral.create({
        data: {
          loanApplicationId: application.id,
          fundName: `Fund ${j + 1}`,
          isin: `INF${100000 + j}${Math.floor(Math.random() * 9999)}`,
          unitsPledged: units,
          nav,
          currentValue: value,
        },
      });
    }

    // Loans only for progressed states
    if (["APPROVED", "DISBURSED", "CLOSED"].includes(status)) {
      const principal = eligibleAmount * rand(0.6, 1);
      const outstanding =
        status === "CLOSED" ? 0 : rand(0, principal * 1.1);

      await prisma.loan.create({
        data: {
          loanApplicationId: application.id,
          principal,
          outstanding,
          interestAccrued: rand(1000, 50000),
          currentLTV: rand(0.3, 0.95),
          status:
            status === "CLOSED"
              ? "CLOSED"
              : Math.random() > 0.1
              ? "ACTIVE"
              : "DEFAULTED",
        },
      });
    }
  }

  console.log("Seed completed successfully 🎯");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
