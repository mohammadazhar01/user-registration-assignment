# User Registration & Login System 

A full‑stack user registration application with a user-friendly responsive UI, client‑side + server‑side validation, email OTP verification powered by **n8n** automation, and a simple dashboard. New registrations trigger an automated email and the user data is saved to a Google Sheet via n8n.

---

## Live URL
https://user-registration-assignment.vercel.app/

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

### Landing page
<img width="1914" height="965" alt="Landing-page" src="https://github.com/user-attachments/assets/4b7abd69-9c20-4fe6-b17d-f5af760a15c4" />

### Login page
<img width="1917" height="965" alt="Login-page" src="https://github.com/user-attachments/assets/9897136e-3345-46a3-846c-2ffec6f0c131" />

### Signup page
<img width="1920" height="966" alt="Signup-page" src="https://github.com/user-attachments/assets/e1256bde-f3e3-4210-b1f5-6b8ce1d045f5" />

### OTP varification page
<img width="1920" height="958" alt="OTP-verificaion-page" src="https://github.com/user-attachments/assets/c3434618-674b-40e1-b93f-6129c2537a1b" />

### Dashboard Page
<img width="1912" height="966" alt="Dashboard-page" src="https://github.com/user-attachments/assets/0665bfdb-e212-481b-9058-69d83c2f3fe9" />


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

---


## Security & Improvements

This project works as a learning assignment. Consider these production improvements:

* Use hashed passwords (bcrypt or Argon2) if passwords are stored anywhere.
* Use HTTPS for all endpoints and secure cookies for sessions/JWT.
* Harden OTP generation and expiry (store hashed OTPs with short TTL).
* Add rate‑limiting on OTP requests to prevent abuse.
* Move persistent storage to a proper database (MongoDB / PostgreSQL) when scaling.

---

