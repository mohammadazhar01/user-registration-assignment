# User Registration & Login System 

A full‑stack user registration application with a user-friendly responsive UI, client‑side + server‑side validation, email OTP verification powered by **n8n** automation, and a simple dashboard. New registrations trigger an automated email and the user data is saved to a Google Sheet via n8n.

---

## ✨ Key Features

* **User‑friendly, responsive UI** (mobile + desktop)
* **Form validation** (client and server) to prevent invalid submissions
* **Email OTP verification** using **n8n** automation (checks OTP before creating account)
* **Dashboard** available after successful login
* **Automated registration email** sent to users on sign up (via n8n)
* **User data saved to Google Sheets** using an n8n workflow (acts as the persistent store)

---

## Project structure

```
/client       # Frontend (React/Vue/HTML — registration form + dashboard)
/server       # Backend (API endpoints, validation, OTP generation)
/README.md
```

---

## Prerequisites

* Node.js (16+ recommended)
* npm or yarn
* n8n instance (cloud or self‑hosted)
* Google account with a Google Sheet and OAuth credentials for n8n

---

## Environment variables

Create `.env` files for `client` and `server` as needed. Example variables you may need:

**server `.env`**

```
MONGODB_URI = mongodb url
PORT=4000
JWT_SECRET=your_jwt_secret
FRONTEND_URL= http://localhost:4000
N8N_URL = your_N8N_send_otp_flow_webhook_url
N8N_Register_URL = your_N8N_user_registarion_confirm_flow_webhook_url

```

**client `.env`**

```
VITE_BACKEND_URL = http://localhost:your_running_port
```

**n8n / Integration (configured inside n8n UI)**

* Google OAuth credentials (Client ID / Client Secret) — used by n8n to write to Google Sheets
* SMTP or email service credentials (for sending OTP and registration emails)

---

## Testing the flow

1. Visit the registration page.
2. Fill the form and request OTP for an email you control.
3. Check your inbox for the OTP (sent by n8n). Enter the OTP to verify.
4. On success, you should be redirected to the dashboard.
5. Verify the Google Sheet — a new row should be added with the user details.
6. Verify the registration email is delivered.

---


## Screenshots

*Add screenshots of the registration form, OTP modal, and dashboard here to help users understand the app.*

---

## n8n integration notes

* The repository expects an n8n workflow that:

  * Accepts a webhook or API call to send OTP emails.
  * Accepts a webhook or API call to save a user row to Google Sheets after registration.
  * Accepts a webhook or API call to send the registration confirmation email.
* Configure a Google Sheets node in n8n using OAuth credentials and grant access to the specific spreadsheet.
* Configure an SMTP or email service node (e.g., SMTP, SendGrid, or Mailgun) in n8n to send OTPs and confirmation emails.

---

## Installation & Local Development

```bash
# Clone the repo
git clone https://github.com/mohammadazhar01/user-registration-assignment.git
cd user-registration-assignment

# Server
cd server
npm install
# create .env and add the required variables
npm run dev   # or npm start depending on the package.json

# Client (open a new terminal)
cd ../client
npm install
# create .env and add the required variables
npm start
```

Open the frontend (usually `http://localhost:3000`) and test registration flows.

---


## Security & Improvements

This project works as a learning assignment. Consider these production improvements:

* Use hashed passwords (bcrypt or Argon2) if passwords are stored anywhere.
* Use HTTPS for all endpoints and secure cookies for sessions/JWT.
* Harden OTP generation and expiry (store hashed OTPs with short TTL).
* Add rate‑limiting on OTP requests to prevent abuse.
* Move persistent storage to a proper database (MongoDB / PostgreSQL) when scaling.

---

