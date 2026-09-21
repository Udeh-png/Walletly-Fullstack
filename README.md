# Walletly

A fintech wallet application built as a portfolio project — spanning a Spring Boot backend, a Next.js web frontend, and a Flutter mobile app. Walletly demonstrates production-style backend engineering (concurrency-safe transactions, security design) alongside a polished, modern UI across web and mobile.

## Overview

Walletly supports wallet-to-wallet transfers, external bank transfers, and secure user authentication — built with the same rigor as a real fintech product, including the concurrency, idempotency, and security tradeoffs that come with handling money.

A standalone piece of this project — the authentication and OTP verification flow — has been extracted and deployed separately as [Fintech Auth](https://app.fintechauth.site/), a live production service, demonstrating the auth architecture end-to-end outside local development.

## Tech Stack

**Backend**
- Spring Boot, Spring Data MongoDB (`mongoTemplate` for transfer logic)
- Redis — rate limiting and session token storage

**Frontend (Web)**
- Next.js, React, TypeScript
- Framer Motion for animations
- Responsive design with mobile-first bottom sheet patterns (bottom sheet → modal at 768px)

**Payment**
- Flutterwave (`flutterwave_standard`, `/v3/payments`) for payment integration

**Design**
- Dark purple theme with glassmorphism UI elements throughout web and mobile

## Architecture Highlights

Walletly's backend is built around a few deliberate engineering decisions, chosen to mirror how real fintech systems handle money safely under concurrent load:

- **Idempotency via `claimTransaction`** — an insert-then-atomic-`findAndModify` pattern on a unique-indexed `reference` field, ensuring a transaction can never be processed twice, even under retries or concurrent requests.
- **Atomic conditional queries over application-level locks** — conditions like `balance >= amount` are baked directly into MongoDB update queries, closing race conditions that read-then-write approaches can't fully avoid.
- **Transaction records live outside the `@Transactional` boundary** — so PENDING/FAILED transaction records always persist for auditing, even if the surrounding operation rolls back.
- **Structured schema design** — nested, type-specific objects (`TransferDetails`, `DepositDetails`) on a shared base schema, rather than flat, sparse documents.
- **Auth via opaque session tokens** — password reset and registration flows use `resetId` → email mappings stored in Redis, combined with httpOnly cookies and Redis-backed OTP rate limiting.

And on the frontend:
- **Responsive, mobile-first patterns** — components like the transfer flow shift from a bottom sheet on mobile to a centered modal at the 768px breakpoint, rather than just scaling a desktop layout down.
- **Portal-based overlays** — modals and overlays use `createPortal` to render outside ancestor DOM stacking contexts, avoiding z-index conflicts introduced by Framer Motion's transform-based animations.
- **Animated, dark-themed UI system** — a consistent dark purple, glassmorphism-inspired design language across transfer flows, toasts, and confirmation screens, built with Framer Motion for transitions.

## Getting Started

### Backend
```bash
cd walletly-backend
./mvnw spring-boot:run
```
Configure your MongoDB and Redis connection details in `application.properties` (or via environment variables) before running.

### Frontend
```bash
cd walletly
npm install
npm run dev
```
Set your backend API URL in `.env.local` (e.g. `NEXT_PUBLIC_API_URL=http://localhost:8080`).

## Current Status

This is an actively developed portfolio project. Core backend transfer logic and authentication flows are well advanced; frontend polish and the Flutter payment integration are ongoing.

## Related

- [Fintech Auth](https://app.fintechauth.site/) — the authentication system from this project, extracted and deployed as a standalone production service, with its own writeup on solving real-world cross-domain cookie, CORS, and email deliverability challenges.

## Disclaimer

This is a personal portfolio project built for learning and demonstration purposes. It is not an officially licensed financial product and is not affiliated with any real payment processor beyond its use of the Flutterwave API for integration purposes.
