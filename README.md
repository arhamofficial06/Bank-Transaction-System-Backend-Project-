# 🏦 Bank Transaction System - Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-9.x-brightgreen.svg)
![JWT](https://img.shields.io/badge/JWT-Auth-orange.svg)
![Nodemailer](https://img.shields.io/badge/Email-OAuth2-yellow.svg)
![License](https://img.shields.io/badge/license-ISC-yellow)

**A production-grade banking transaction system with double-entry accounting, idempotency, and email notifications**

[Features](#features) •
[Tech Stack](#tech-stack) •
[Installation](#installation) •
[API Routes](#api-routes) •
[Database Models](#database-models) •
[Transaction Flow](#transaction-flow)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Transaction Flow](#transaction-flow)
- [Idempotency](#idempotency)
- [Email Service](#email-service)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [License](#license)

---

## ✨ Features

### 👤 User Features
- **User Registration** - Create new user accounts with email verification
- **User Login** - Secure authentication with JWT tokens
- **Account Management** - Create and manage multiple bank accounts
- **Balance Inquiry** - Check account balance in real-time

### 💰 Transaction Features
- **Money Transfer** - Transfer funds between accounts
- **Double-Entry Accounting** - Proper debit/credit ledger entries
- **Idempotency Keys** - Prevent duplicate transactions
- **Transaction Status** - PENDING, COMPLETED, FAILED, REVERSED states

### 🔒 Security Features
- **JWT Authentication** - Token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Token Blacklisting** - Invalidate tokens on logout
- **HTTP-Only Cookies** - Secure cookie storage

### 📧 Notification Features
- **Welcome Emails** - Send registration confirmation emails
- **Transaction Emails** - Notify users about successful/failed transactions
- **OAuth2 Email Service** - Secure Gmail integration

### 🛠️ Technical Features
- **MongoDB Transactions** - ACID compliance for financial operations
- **Ledger Immutability** - Ledger entries cannot be modified/deleted
- **Role-Based Access** - System user for initial fund transfers
- **Account Status Management** - ACTIVE, FROZEN, CLOSED states

---

## 🚀 Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | >=18.x | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| MongoDB | - | Database |
| Mongoose | 9.3.0 | ODM for MongoDB |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |

### Email Service
| Technology | Purpose |
|------------|---------|
| Nodemailer | Email sending |
| Gmail OAuth2 | Authentication for email |

### Key Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.3.0",
    "nodemailer": "^8.0.2"
  }
}
```

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gmail account with OAuth2 credentials
- Git

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arhamofficial06/Bank-Transaction-System-Backend-Project-.git
   cd Bank-Transaction-System-Backend-Project-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000

   # Database
   MONGO_URI=mongodb://127.0.0.1:27017/bank_system

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here

   # Email Configuration (Gmail OAuth2)
   EMAIL_USER=your_email@gmail.com
   CLIENT_ID=your_google_client_id
   CLIENT_SECRET=your_google_client_secret
   REFRESH_TOKEN=your_google_refresh_token
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running locally:
   ```bash
   mongod
   ```

5. **Run the application**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

6. **Server is running!**
   ```
   http://localhost:3000
   ```

---

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `EMAIL_USER` | Gmail email address | Yes |
| `CLIENT_ID` | Google OAuth2 client ID | Yes |
| `CLIENT_SECRET` | Google OAuth2 client secret | Yes |
| `REFRESH_TOKEN` | Google OAuth2 refresh token | Yes |

---

## 🛣️ API Routes

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| POST | `/logout` | Logout user | Public |

### Account Routes (`/api/accounts`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create new account | Authenticated |
| GET | `/` | Get all user accounts | Authenticated |
| GET | `/balance/:accountId` | Get account balance | Authenticated |

### Transaction Routes (`/api/transactions`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create new transaction | Authenticated |
| POST | `/system/initial-funds` | Create initial funds transaction | System User only |

---

## 💾 Database Models

### User Model
```javascript
{
  email: String (required, unique),
  name: String (required),
  password: String (required, hashed),
  systemUser: Boolean (default: false, immutable),
  createdAt: Date,
  updatedAt: Date
}
```

### Account Model
```javascript
{
  user: ObjectId (ref: 'user', required),
  status: String (enum: ['ACTIVE', 'FROZEN', 'CLOSED'], default: 'ACTIVE'),
  currency: String (default: 'PKR'),
  createdAt: Date,
  updatedAt: Date
}
```

### Ledger Model
```javascript
{
  account: ObjectId (ref: 'account', required, immutable),
  amount: Number (required, immutable),
  transaction: ObjectId (ref: 'transaction', required, immutable),
  type: String (enum: ['DEBIT', 'CREDIT'], required, immutable)
}
```

### Transaction Model
```javascript
{
  fromAccount: ObjectId (ref: 'account', required),
  toAccount: ObjectId (ref: 'account', required),
  status: String (enum: ['PENDING', 'COMPLETED', 'FAILED', 'REVERSED'], default: 'PENDING'),
  amount: Number (required, min: 0),
  idempotencyKey: String (required, unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Blacklist Model
```javascript
{
  token: String (required, unique),
  createdAt: Date (TTL index: 3 days)
}
```

---

## 🔄 Transaction Flow

### Money Transfer Process

1. **Validate Request**
   - Check required fields (fromAccount, toAccount, amount, idempotencyKey)
   - Verify accounts exist and are ACTIVE

2. **Idempotency Check**
   - Check if transaction already exists with the same idempotencyKey
   - Return existing transaction if already processed

3. **Balance Check**
   - Calculate sender's current balance from ledger
   - Ensure sufficient funds for transfer

4. **Start MongoDB Transaction**
   - Begin ACID-compliant database session

5. **Create PENDING Transaction**
   - Create transaction record with status "PENDING"

6. **Create Debit Entry**
   - Add DEBIT entry to ledger for sender's account

7. **Simulate Processing (15 seconds)**
   - Demonstrates real-world transaction delay

8. **Create Credit Entry**
   - Add CREDIT entry to ledger for receiver's account

9. **Mark Transaction COMPLETED**
   - Update transaction status to "COMPLETED"

10. **Commit Transaction**
    - Commit all changes to database

11. **Send Email Notification**
    - Send transaction confirmation email

### Balance Calculation
```javascript
// Calculates balance by summing all ledger entries
Balance = SUM(CREDIT amounts) - SUM(DEBIT amounts)
```

---

## 🛡️ Idempotency

Idempotency ensures that multiple identical requests produce the same result. This is critical for financial transactions to prevent double transfers.

### How It Works

1. Client generates a unique `idempotencyKey` (e.g., UUID) for each transaction
2. Server checks if transaction with this key already exists
3. If exists, returns existing transaction without processing again
4. If not exists, processes the transaction and stores the key

### Implementation
```javascript
const isTransactionAlreadyExists = await transactionModel.findOne({
  idempotencyKey
});

if (isTransactionAlreadyExists) {
  if (isTransactionAlreadyExists.status === "COMPLETED") {
    return res.status(200).json({
      message: "Transaction already processed",
      transaction: isTransactionAlreadyExists
    });
  }
  // Handle PENDING, FAILED, REVERSED cases...
}
```

---

## 📧 Email Service

### Features
- **Registration Emails** - Welcome email on user registration
- **Transaction Emails** - Confirmation email for successful transactions
- **Failure Emails** - Notification for failed transactions

### Gmail OAuth2 Setup

1. Go to Google Cloud Console
2. Create a new project
3. Enable Gmail API
4. Create OAuth2 credentials
5. Generate refresh token

### Email Templates

**Registration Email:**
```html
<p>Hello {name},</p>
<p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p>
<p>Best regards,<br>The Backend Ledger Team</p>
```

**Transaction Email:**
```html
<p>Hello {name},</p>
<p>Your transaction of ${amount} to account {toAccount} was successful.</p>
<p>Best regards,<br>The Backend Ledger Team</p>
```

---

## 📁 Project Structure

```
bank-transaction-system/
├── src/
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── account.controller.js    # Account operations
│   │   └── transaction.controller.js # Transaction logic
│   ├── models/
│   │   ├── user.model.js            # User schema
│   │   ├── account.model.js         # Account schema with balance calculation
│   │   ├── ledger.model.js          # Immutable ledger entries
│   │   ├── transaction.model.js     # Transaction records
│   │   └── blackList.model.js       # Token blacklist
│   ├── routes/
│   │   ├── auth.routes.js           # Auth endpoints
│   │   ├── account.routes.js        # Account endpoints
│   │   └── transaction.routes.js    # Transaction endpoints
│   ├── middleware/
│   │   └── auth.middleware.js       # JWT verification
│   ├── services/
│   │   └── email.service.js         # Nodemailer integration
│   └── app.js                       # Express app setup
├── server.js                        # Entry point
├── .env                             # Environment variables
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

---

## 📝 Usage Examples

### 1. Register a New User

**Request:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "name": "John Doe",
  "password": "secure123"
}
```

**Response:**
```json
{
  "user": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 2. Login User

**Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:**
```json
{
  "user": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3. Create Account

**Request:**
```bash
POST /api/accounts
Cookie: token=your_jwt_token
```

**Response:**
```json
{
  "account": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
    "user": "65f1a2b3c4d5e6f7a8b9c0d1",
    "status": "ACTIVE",
    "currency": "PKR"
  }
}
```

### 4. Check Account Balance

**Request:**
```bash
GET /api/accounts/balance/65f1a2b3c4d5e6f7a8b9c0d2
Cookie: token=your_jwt_token
```

**Response:**
```json
{
  "accountId": "65f1a2b3c4d5e6f7a8b9c0d2",
  "balance": 5000
}
```

### 5. Transfer Money

**Request:**
```bash
POST /api/transactions
Cookie: token=your_jwt_token
Content-Type: application/json

{
  "fromAccount": "65f1a2b3c4d5e6f7a8b9c0d2",
  "toAccount": "65f1a2b3c4d5e6f7a8b9c0d3",
  "amount": 1000,
  "idempotencyKey": "unique-key-123"
}
```

**Response:**
```json
{
  "message": "Transaction completed successfully",
  "transaction": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d4",
    "fromAccount": "65f1a2b3c4d5e6f7a8b9c0d2",
    "toAccount": "65f1a2b3c4d5e6f7a8b9c0d3",
    "amount": 1000,
    "status": "COMPLETED",
    "idempotencyKey": "unique-key-123"
  }
}
```

### 6. Initial Funds Transfer (System User)

**Request:**
```bash
POST /api/transactions/system/initial-funds
Cookie: token=system_user_jwt_token
Content-Type: application/json

{
  "toAccount": "65f1a2b3c4d5e6f7a8b9c0d3",
  "amount": 5000,
  "idempotencyKey": "initial-funds-456"
}
```

---

## 🔐 Ledger Immutability

Ledger entries are immutable by design to maintain financial integrity:

```javascript
function preventLedgerModification() {
  throw new Error(
    "Ledger entries are immutable and cannot be modified or deleted"
  );
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
```

---

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```
- Runs with nodemon for auto-restart
- Great for development

### Production Mode
```bash
npm start
```
- Runs with node
- Use in production environment

---

## 📝 To-Do / Upcoming Features

- [ ] Add transaction history with pagination
- [ ] Implement webhooks for external notifications
- [ ] Add two-factor authentication (2FA)
- [ ] Create admin dashboard
- [ ] Add audit logs
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger
- [ ] Create frontend client
- [ ] Add recurring payments
- [ ] Implement multi-currency support

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Arham Official**

- GitHub: [@arhamofficial06](https://github.com/arhamofficial06)
- Project Repository: [Bank Transaction System](https://github.com/arhamofficial06/Bank-Transaction-System-Backend-Project-.git)

---

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- Nodemailer team
- All contributors and users

---

<div align="center">

**⭐ Star this repository if you find it helpful! ⭐**

### Built with ❤️ for secure and reliable banking systems

</div>