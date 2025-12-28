# 1fi LAMF LMS

A demo **Loan Management System (LMS)** for an NBFC offering **LAMF (Lending Against Mutual Funds)**. The project models real‑world collateralized loan flows around MF units, ISINs, NAV, eligibility, and LTV rules.

---

## i. Setup & Run Instructions

### Prerequisites

* Node.js 
* Docker — or PostgreSQL
* npm

### 1) Clone & install via github OR pull the docker image(Recommended)

```bash
git clone https://github.com/igaurav13/lms-1fi
cd lms-1fi
npm install

OR

docker pull igauravpsd/1fi:latest
```

### 2) Start database

```bash
docker run -p 3000:3000 \
-e DATABASE_URL=$DATABASE_URL

OR

configure your own DB and set in env:
DATABASE_URL="postgresql://user:pass@localhost:5432/lamf_lms"
```

### 3) Generate & migrate schema

```bash
npx prisma generate
npx prisma migrate deploy   

```

### 4) Seed sample data (optional)

```bash
npm run seed
```

### 5) Start app

```
npm run dev        # Next.js dev server (at port 3000 or the url http://localhost:3000)
```

all API server runs under `/api/*` routes via Next.js App Router.

---

## ii. API Endpoints & Example Responses

> All endpoints are JSON. Validation errors return HTTP 400 with `{ message, fieldErrors }`.


### Borrowers

#### `GET /borrowers`

```json
[
    {
        "id": "463c1158-8463-4639-85d9-999305419037",
        "fullName": "Tester Zero",
        "pan": "GETPP348T9",
        "mobile": "9999444422",
        "email": "tester@seven.com",
        "kycStatus": "PENDING",
        "createdAt": "2025-12-26T23:04:05.426Z",
        "updatedAt": "2025-12-26T23:04:05.426Z"
    },
    {
        "id": "17cd87c0-0830-460b-b974-c92833313237",
        "fullName": "Borrower 15",
        "pan": "ABCDE1014F",
        "mobile": "999991014",
        "email": "borrower15@mail.com",
        "kycStatus": "APPROVED",
        "createdAt": "2025-12-26T00:55:47.935Z",
        "updatedAt": "2025-12-26T00:55:47.935Z"
    },
    {...}
]
```

#### `POST /borrowers`

**Request**
```json
{
  "fullName": "Tester One",
  "pan": "SETEE4977R",
  "mobile": "9999444477",
  "email": "tester1@gmail.com"
}
```

**Response**
```json
{
    "id": "36cfde8f-abbb-42dd-be60-23a379ee8858",
    "fullName": "Tester One",
    "pan": "SETEE4977R",
    "mobile": "9999444477",
    "email": "tester1@gmail.com",
    "kycStatus": "PENDING",
    "createdAt": "2025-12-26T23:39:36.036Z",
    "updatedAt": "2025-12-26T23:39:36.036Z"
}
```
---

### Loan Products

#### `GET /loan-products`

Returns all configured LAMF loan products.

**200**

```json
[
    {
        "id": "44fe0416-42ec-4077-8096-04899dccaab9",
        "name": "debt mutual fund",
        "interestRate": 9,
        "maxLTV": 0.5,
        "marginCallLTV": 0.6,
        "liquidationLTV": 0.7,
        "minLoanAmount": 10000,
        "maxLoanAmount": 2000000,
        "status": "ACTIVE",
        "createdAt": "2025-12-26T23:19:21.094Z",
        "updatedAt": "2025-12-26T23:19:21.094Z"
    },
    {
        "id": "813a4c57-208c-4125-bd0f-079de043040f",
        "name": "mid cap mutual fund",
        "interestRate": 10,
        "maxLTV": 0.6,
        "marginCallLTV": 0.7,
        "liquidationLTV": 0.8,
        "minLoanAmount": 10000,
        "maxLoanAmount": 10000000,
        "status": "ACTIVE",
        "createdAt": "2025-12-26T20:34:53.919Z",
        "updatedAt": "2025-12-26T20:34:53.919Z"
    },
    {...},
]
```

#### `POST /loan-products`

Creates a product:

**Request**
```json
{
  "name": "Hybrid Mutual Fund",
  "interestRate": 11.0,
  "maxLTV": 0.5,
  "marginCallLTV": 0.6,
  "liquidationLTV": 0.7,
  "minLoanAmount": 25000,
  "maxLoanAmount": 3000000
}
```

**Response 201**
```json
{
    "id": "b4fed900-f701-4cee-83e5-099d7c64bc8f",
    "name": "Hybrid Mutual Fund",
    "interestRate": 11,
    "maxLTV": 0.5,
    "marginCallLTV": 0.6,
    "liquidationLTV": 0.7,
    "minLoanAmount": 25000,
    "maxLoanAmount": 3000000,
    "status": "ACTIVE",
    "createdAt": "2025-12-26T23:42:59.694Z",
    "updatedAt": "2025-12-26T23:42:59.694Z"
}
```

---

### Loan Applications

#### `GET /loan-applications`

List all applications (draft, active, closed).

**200**

```json
[
    {
        "id": "708b25dd-899f-4d2d-8781-f313a9bcd5b6",
        "borrowerId": "17cd87c0-0830-460b-b974-c92833313237",
        "loanProductId": "813a4c57-208c-4125-bd0f-079de043040f",
        "requestedAmount": 200000,
        "eligibleAmount": null,
        "status": "DRAFT",
        "createdAt": "2025-12-26T21:10:14.409Z",
        "updatedAt": "2025-12-26T21:10:14.409Z",
        "borrower": {
            "id": "17cd87c0-0830-460b-b974-c92833313237",
            "fullName": "Borrower 15",
            "pan": "ABCDE1014F",
            "mobile": "999991014",
            "email": "borrower15@mail.com",
            "kycStatus": "APPROVED",
            "createdAt": "2025-12-26T00:55:47.935Z",
            "updatedAt": "2025-12-26T00:55:47.935Z"
        },
        "loanProduct": {
            "id": "813a4c57-208c-4125-bd0f-079de043040f",
            "name": "mid cap mutual fund",
            "interestRate": 10,
            "maxLTV": 0.6,
            "marginCallLTV": 0.7,
            "liquidationLTV": 0.8,
            "minLoanAmount": 10000,
            "maxLoanAmount": 10000000,
            "status": "ACTIVE",
            "createdAt": "2025-12-26T20:34:53.919Z",
            "updatedAt": "2025-12-26T20:34:53.919Z"
        },
        "collaterals": [],
        "loan": null
    },
    {...}
]
```

Creates a new loan application and evaluates collateral eligibility, but here collatorals eligibility is still in pending state to execute.
#### `POST /loan-applications`
**Request**
```json
{
  "borrowerId": "36cfde8f-abbb-42dd-be60-23a379ee8858",
  "loanProductId": "b4fed900-f701-4cee-83e5-099d7c64bc8f",
  "requestedAmount": 200000
}
```
**201**
```json
{
    "id": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
    "borrowerId": "36cfde8f-abbb-42dd-be60-23a379ee8858",
    "loanProductId": "b4fed900-f701-4cee-83e5-099d7c64bc8f",
    "requestedAmount": 200000,
    "eligibleAmount": null,
    "status": "DRAFT",
    "createdAt": "2025-12-26T23:48:35.797Z",
    "updatedAt": "2025-12-26T23:48:35.797Z"
}
```

---

### Collateral & Eligibility

#### `POST /collaterals`

Evaluates MF holdings against eligibility rules (AMC whitelist, scheme type, haircut, pledgable flag).
**Request**
```json
{
  "loanApplicationId": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
  "fundName": "Hybrid Mutual Fund",
  "isin": "INF777KF13G7",
  "unitsPledged": 120,
  "nav": 151.5
}
```

**200**
```json
{
    "id": "419d463d-e1a8-4fb4-9f0d-c9e59294bb8c",
    "loanApplicationId": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
    "fundName": "Hybrid Mutual Fund",
    "isin": "INF777KF13G7",
    "unitsPledged": 120,
    "nav": 151.5,
    "currentValue": 18180,
    "createdAt": "2025-12-26T23:59:19.187Z"
}
```

#### `GET /collaterals`

```json
[
    {
        "id": "419d463d-e1a8-4fb4-9f0d-c9e59294bb8c",
        "loanApplicationId": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
        "fundName": "Hybrid Mutual Fund",
        "isin": "INF777KF13G7",
        "unitsPledged": 120,
        "nav": 151.5,
        "currentValue": 18180,
        "createdAt": "2025-12-26T23:59:19.187Z",
        "loanApplication": {
            "id": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
            "borrowerId": "36cfde8f-abbb-42dd-be60-23a379ee8858",
            "loanProductId": "b4fed900-f701-4cee-83e5-099d7c64bc8f",
            "requestedAmount": 200000,
            "eligibleAmount": null,
            "status": "DRAFT",
            "createdAt": "2025-12-26T23:48:35.797Z",
            "updatedAt": "2025-12-26T23:48:35.797Z"
        }
    },
    {
        "id": "f5b004d6-fe6d-4f89-bca6-388946995768",
        "loanApplicationId": "82d5eb67-4dd5-402e-9f73-bce87fc929cb",
        "fundName": "Fund 3",
        "isin": "INF1000025557",
        "unitsPledged": 29.86,
        "nav": 347.17,
        "currentValue": 10366.5,
        "createdAt": "2025-12-26T00:55:59.185Z",
        "loanApplication": {
            "id": "82d5eb67-4dd5-402e-9f73-bce87fc929cb",
            "borrowerId": "a07bf86e-acad-41be-b02d-710083c9e46f",
            "loanProductId": "81ec0142-5388-4dc9-9e0e-fab0ae2f0906",
            "requestedAmount": 211822.62,
            "eligibleAmount": 1985470.86,
            "status": "DISBURSED",
            "createdAt": "2025-12-26T00:55:58.797Z",
            "updatedAt": "2025-12-26T00:55:58.797Z"
        }
    },
    {...}
]
```


##### `POST /eligibility`
**Request**
```json
{
  "loanApplicationId": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116"
}
```
**Response**
```json
{
    "collateralValue": 18180,
    "maxLTV": 0.5,
    "eligibleAmount": 9090,
    "application": {
        "id": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
        "borrowerId": "36cfde8f-abbb-42dd-be60-23a379ee8858",
        "loanProductId": "b4fed900-f701-4cee-83e5-099d7c64bc8f",
        "requestedAmount": 200000,
        "eligibleAmount": 9090,
        "status": "ELIGIBLE",
        "createdAt": "2025-12-26T23:48:35.797Z",
        "updatedAt": "2025-12-27T00:04:17.781Z"
    }
}

```

#### `POST /loan-applications/status`

**Request**
```json
{
  "id": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
  "status": "APPROVED"
}
```
**Response**
```json
{
    "id": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
    "borrowerId": "36cfde8f-abbb-42dd-be60-23a379ee8858",
    "loanProductId": "b4fed900-f701-4cee-83e5-099d7c64bc8f",
    "requestedAmount": 200000,
    "eligibleAmount": 9090,
    "status": "APPROVED",
    "createdAt": "2025-12-26T23:48:35.797Z",
    "updatedAt": "2025-12-27T00:05:46.509Z"
}
```

### Active Loans

##### `GET /loans`
```json
[
    {
        "id": "455297c7-b395-4178-8c15-e08b9a2baec1",
        "loanApplicationId": "b3ee6170-12f9-43c7-9a87-0858a09763e2",
        "principal": 108212.8256,
        "outstanding": 98111.36,
        "interestAccrued": 3202.23,
        "currentLTV": 0.94,
        "status": "ACTIVE",
        "createdAt": "2025-12-26T00:55:58.674Z",
        "updatedAt": "2025-12-26T00:55:58.674Z",
        "loanApplication": {
            "id": "b3ee6170-12f9-43c7-9a87-0858a09763e2",
            "borrowerId": "6ea7f718-9de0-4c2d-a907-693e6262470b",
            "loanProductId": "ac67098b-0c7b-4253-a4a7-275251df369f",
            "requestedAmount": 379126.16,
            "eligibleAmount": 169082.54,
            "status": "DISBURSED",
            "createdAt": "2025-12-26T00:55:58.426Z",
            "updatedAt": "2025-12-26T00:55:58.426Z",
            "borrower": {
                "id": "6ea7f718-9de0-4c2d-a907-693e6262470b",
                "fullName": "Borrower 24",
                "pan": "ABCDE1023F",
                "mobile": "999991023",
                "email": "borrower24@mail.com",
                "kycStatus": "REJECTED",
                "createdAt": "2025-12-26T00:55:47.935Z",
                "updatedAt": "2025-12-26T00:55:47.935Z"
            },
            "loanProduct": {
                "id": "ac67098b-0c7b-4253-a4a7-275251df369f",
                "name": "Standard Loan",
                "interestRate": 12.5,
                "maxLTV": 0.6,
                "marginCallLTV": 0.7,
                "liquidationLTV": 0.8,
                "minLoanAmount": 50000,
                "maxLoanAmount": 1000000,
                "status": "ACTIVE",
                "createdAt": "2025-12-26T00:55:47.028Z",
                "updatedAt": "2025-12-26T00:55:47.028Z"
            },
            "collaterals": [
                {
                    "id": "a5efd053-79df-4ae1-96a6-30b81cea82f1",
                    "loanApplicationId": "b3ee6170-12f9-43c7-9a87-0858a09763e2",
                    "fundName": "Fund 1",
                    "isin": "INF100000782",
                    "unitsPledged": 324.13,
                    "nav": 279.99,
                    "currentValue": 90753.16,
                    "createdAt": "2025-12-26T00:55:58.555Z"
                }
            ]
        }
    },
    {
        "id": "2d43bc10-b828-4e51-b708-dfab151a5fc1",
        "loanApplicationId": "69ee68ab-c01f-4f7b-bc79-12dc6c66b8fe",
        "principal": 533699.3738000001,
        "outstanding": 430100.34,
        "interestAccrued": 28425.87,
        "currentLTV": 0.58,
        "status": "ACTIVE",
        "createdAt": "2025-12-26T00:55:58.059Z",
        "updatedAt": "2025-12-26T00:55:58.059Z",
        "loanApplication": {
            "id": "69ee68ab-c01f-4f7b-bc79-12dc6c66b8fe",
            "borrowerId": "34189ecd-3ca5-4738-bea4-9d60bdcc842a",
            "loanProductId": "fcc0045c-b61b-41cf-8c82-9e4a5d6a65db",
            "requestedAmount": 261152.04,
            "eligibleAmount": 550205.54,
            "status": "APPROVED",
            "createdAt": "2025-12-26T00:55:57.686Z",
            "updatedAt": "2025-12-26T00:55:57.686Z",
            "borrower": {
                "id": "34189ecd-3ca5-4738-bea4-9d60bdcc842a",
                "fullName": "Borrower 22",
                "pan": "ABCDE1021F",
                "mobile": "999991021",
                "email": "borrower22@mail.com",
                "kycStatus": "UNDER_REVIEW",
                "createdAt": "2025-12-26T00:55:47.935Z",
                "updatedAt": "2025-12-26T00:55:47.935Z"
            },
            "loanProduct": {
                "id": "fcc0045c-b61b-41cf-8c82-9e4a5d6a65db",
                "name": "Aggressive Loan",
                "interestRate": 15.2,
                "maxLTV": 0.7,
                "marginCallLTV": 0.8,
                "liquidationLTV": 0.9,
                "minLoanAmount": 25000,
                "maxLoanAmount": 750000,
                "status": "ACTIVE",
                "createdAt": "2025-12-26T00:55:47.028Z",
                "updatedAt": "2025-12-26T00:55:47.028Z"
            },
            "collaterals": [
                {
                    "id": "7bd13e4c-0b51-4208-b813-86de045931c3",
                    "loanApplicationId": "69ee68ab-c01f-4f7b-bc79-12dc6c66b8fe",
                    "fundName": "Fund 1",
                    "isin": "INF1000005663",
                    "unitsPledged": 202.14,
                    "nav": 119.37,
                    "currentValue": 24129.45,
                    "createdAt": "2025-12-26T00:55:57.818Z"
                },
                {
                    "id": "410133de-fec6-4c0d-b253-2850a8ee5343",
                    "loanApplicationId": "69ee68ab-c01f-4f7b-bc79-12dc6c66b8fe",
                    "fundName": "Fund 2",
                    "isin": "INF1000012986",
                    "unitsPledged": 296.56,
                    "nav": 323.49,
                    "currentValue": 95934.19,
                    "createdAt": "2025-12-26T00:55:57.939Z"
                }
            ]
        }
    }
]
```

#### `POST /loans`

**Request**
```json
{
  "loanApplicationId": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
  "principal": 9090
}

```
**Response**
```json
{
    "id": "bbd7ef0f-79bf-4327-8ec5-3b269644d452",
    "loanApplicationId": "ca64099c-2dbc-4bfc-a505-ce1d46b5e116",
    "principal": 9090,
    "outstanding": 9090,
    "interestAccrued": 0,
    "currentLTV": 0,
    "status": "ACTIVE",
    "createdAt": "2025-12-27T00:15:24.653Z",
    "updatedAt": "2025-12-27T00:15:24.653Z"
}
```



### Improvements to make: 
- A cron job to recalculate LTV.
- An eligibility route to check if the borrower is eligible to take loan.
- A flow to schedule repayment
- frontend needs to be more sync up with the API's.
- Design can be more consistent. 
- I also do feel like there is chance of improvement in the schema design as well.



---

## iii. Tech Stack

* **Frontend**: Next.js (App Router), React, Tailwind, TansStackQuery.
* **API / Backend**: Next.js route handlers.
* **DB / ORM**: PostgreSQL + Prisma- NeonDB
* **Auth (optional demo)**: - OAuth2.O (not implemented)
* **DevOps**: Docker

---

## iv. Schema (Prisma)

> Core entities modeled to reflect LMS of NBFC for LAMF where collateral workflows needs to be tracked.

```prisma
model LoanProduct {
  id              String            @id @default(uuid())
  name            String
  interestRate    Float
  maxLTV          Float
  marginCallLTV   Float
  liquidationLTV  Float
  minLoanAmount   Float
  maxLoanAmount   Float
  status          String            @default("ACTIVE")
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  loanApplications LoanApplication[]
}

model Borrower {
  id        String                  @id @default(uuid())
  fullName  String
  pan       String                  @unique
  mobile    String
  email     String
  kycStatus String                  @default("PENDING")
  createdAt DateTime                @default(now())
  updatedAt DateTime                @updatedAt
  loanApplications LoanApplication[]
}

model LoanApplication {
  id              String            @id @default(uuid())
  borrowerId      String
  loanProductId   String
  requestedAmount Float
  eligibleAmount  Float?
  status          String            @default("DRAFT")
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  borrower    Borrower              @relation(fields: [borrowerId], references: [id])
  loanProduct LoanProduct           @relation(fields: [loanProductId], references: [id])
  collaterals Collateral[]
  loan        Loan?
}

model Collateral {
  id                String           @id @default(uuid())
  loanApplicationId String
  fundName          String
  isin              String
  unitsPledged      Float
  nav               Float
  currentValue      Float
  createdAt         DateTime          @default(now())
  loanApplication LoanApplication      @relation(fields: [loanApplicationId], references: [id])
}

model Loan {
  id                String            @id @default(uuid())
  loanApplicationId String            @unique
  principal         Float
  outstanding       Float
  interestAccrued   Float
  currentLTV        Float
  status            String            @default("ACTIVE")
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  loanApplication LoanApplication     @relation(fields: [loanApplicationId], references: [id])
}
```

---

### Flow:
- Borrower opt to take loan again MF 
-  Collateral Submitted by the Borrower or fetched via any api if exist and offer them to take loan against their MF.
-  if there Eligibility allows checked via PanCard 
- Application needs to be submitted by the user and the same application needs verify on admin side or some automated powerful backend should be auto injected
- Status of that loan user can check anytime
-  if Loan is Approved, the repayment schedule is assigned for than particular Borrower.
- A cron job that runs constantly to check marginLTV and inform borrower to take action, and if it surpassed the threshold LTV the collatoral needed to sold.
- Repayment Schedule should be there to maintain their Cibil Score and release pleadged MF accordingly to maintain required LTV.



## Notes and Learnings
* Designed as a demo for the **1fi LAMF** workflow.
* LTV & eligibility validations are injected in UI and API layers.
* learnt about how things working in the Lending Fintech industry especially LAMF.

