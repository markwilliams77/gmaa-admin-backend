# GMAA Admin Backend API Reference

## Overview

This document describes the full admin backend API surface, including auth and protected admin endpoints.

All protected routes require the HTTP header:

```
Authorization: Bearer <token>
```


## Authentication

### 1) POST /api/auth/admin/generate
Create a new admin credentials pair.

Request:
```json
{
  "secret": "YOUR_ADMIN_GENERATION_SECRET"
}
```

Response:
```json
{
  "success": true,
  "credentials": {
    "username": "toothless-night-534",
    "password": "XDF1URDoUM8Z^Fbx",
    "email": "admin-1779939400534@gmaa.local"
  }
}
```

### 2) POST /api/auth/login
Log in with an email or username and receive a JWT.

Request:
```json
{
  "identifier": "toothless-night-534",
  "password": "XDF1URDoUM8Z^Fbx"
}
```

The `identifier` value may be the generated admin `email` or `username`.
For compatibility, `email` and `username` fields are also accepted.

Response:
```json
{
  "success": true,
  "token": "eyJ...<jwt>...",
  "user": {
    "id": "...",
    "email": "...",
    "username": "..."
  }
}
```

---

## Tenders

### GET /api/tenders
Returns a list of active tenders.

Response:
```json
{
  "success": true,
  "tenders": [
    {
      "id": "T-001",
      "service": "Robotic Knee Replacement",
      "category": "Orthopaedics",
      "region": "Southeast Asia",
      "budget": "USD 360,000",
      "description": "Institutional request for Robotic Knee Replacement excellence in Southeast Asia.",
      "requirements": [],
      "bids": 0,
      "status": "open",
      "createdAt": "2026-05-28T12:34:56Z",
      "awardedBidId": null,
      "awardedVendorId": null
    }
  ]
}
```

### POST /api/tenders
Create a new tender and optionally broadcast.

Request:
```json
{
  "tenderData": {
    "service": "Robotic Knee Replacement",
    "category": "Orthopaedics",
    "region": "Southeast Asia",
    "budget": "USD 360,000",
    "deadline": "72 Hours",
    "description": "Institutional request for Robotic Knee Replacement excellence in Southeast Asia."
  },
  "vendorEmails": [
    "vendor-relations@med-global.com",
    "clinical-operations@health-net.int"
  ],
  "broadcast": true
}
```

Response:
```json
{
  "success": true,
  "tenderId": "T-001",
  "broadcast": true,
  "message": "Tender created"
}
```

### PUT /api/tenders/:tenderId
Update tender status or metadata.

Request:
```json
{
  "status": "awarded",
  "awardedBidId": "B-1234",
  "awardedVendorId": "V-5678"
}
```

Response:
```json
{
  "success": true,
  "tenderId": "T-001"
}
```

---

## Bids

### GET /api/bids
Returns all bids or filtered bids.

Query params:
- `tenderId`
- `vendorId`

Example: `/api/bids?tenderId=T-001`

Response:
```json
{
  "success": true,
  "bids": [
    {
      "id": "B-1234",
      "tenderId": "T-001",
      "vendorId": "V-5678",
      "vendorName": "Apollo Integrated",
      "amount": "USD 320,000",
      "status": "pending",
      "createdAt": "2026-05-28T11:20:00Z"
    }
  ]
}
```

### PUT /api/bids/:bidId
Update bid status.

Request:
```json
{
  "status": "awarded"
}
```

Response:
```json
{
  "success": true,
  "bidId": "B-1234"
}
```

---

## Vendors

### GET /api/vendors
Returns vendor profiles.

Response:
```json
{
  "success": true,
  "vendors": [
    {
      "id": "V-5678",
      "name": "Apollo Integrated",
      "email": "vendor-relations@med-global.com",
      "location": "India",
      "specialty": "Cardiology",
      "status": "active"
    }
  ]
}
```

---

## Support Tickets

### GET /api/support-tickets
Returns support ticket list.

Response:
```json
{
  "success": true,
  "tickets": [
    {
      "id": "ST-1001",
      "subject": "Vendor enrollment issue",
      "status": "pending",
      "lastUpdated": "2026-05-28T12:00:00Z",
      "lastMessage": "Please provide required documents."
    }
  ]
}
```

### POST /api/support-tickets/:ticketId/messages
Add an admin message to a ticket thread.

Request:
```json
{
  "text": "We are reviewing your issue and will respond shortly.",
  "sender": "admin",
  "senderName": "GMAA Backend Team"
}
```

Response:
```json
{
  "success": true,
  "messageId": "M-7890"
}
```

---

## Consultations

### GET /api/consultations
Returns consultation inquiries.

Response:
```json
{
  "success": true,
  "consultations": [
    {
      "id": "C-2345",
      "name": "Dr. Jane Doe",
      "email": "jane.doe@hospital.org",
      "phone": "+1-555-0100",
      "request": "Need supplier for cardiology equipment",
      "status": "processing",
      "remarks": "Escalated to procurement team",
      "createdAt": "2026-05-28T09:15:00Z"
    }
  ]
}
```

### PUT /api/consultations/:consultationId
Update consultation status or remarks.

Request:
```json
{
  "status": "won",
  "remarks": "Confirmed supplier assignment."
}
```

Response:
```json
{
  "success": true,
  "consultationId": "C-2345"
}
```

---

## Leads

### POST /api/leads/:leadId/messages
Sends a new message into lead inquiry chat.

Request:
```json
{
  "text": "Your inquiry is now being handled by our care coordination team.",
  "sender": "admin",
  "senderName": "GMAA Support"
}
```

Response:
```json
{
  "success": true,
  "messageId": "M-9876"
}
```

---

## System / Demo

### POST /api/system/seed
Seeds demo data.

Request:
```json
{ "mode": "demo" }
```

Response:
```json
{ "success": true, "message": "Demo data seeded" }
```

### POST /api/system/purge
Deletes demo/demo data.

Request:
```json
{ "mode": "all" }
```

Response:
```json
{ "success": true, "message": "Demo data cleared" }
```

---

## Notes

- No signup flow exists for users.
- Admin credentials are generated on demand via `/api/auth/admin/generate`.
- Only admin accounts exist.
- All protected routes require a valid JWT.
- Use `ADMIN_GENERATION_SECRET` from `.env` to generate new admin accounts.
