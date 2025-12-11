# SwiftWallet Backend

Express + MongoDB API scaffolding for SwiftWallet.

## Structure

- `src/index.js` starts the server.
- `src/config` holds environment and database helpers.
- `src/models` defines the data schemas.
- `src/controllers` maps business logic.
- `src/routes` defines the HTTP surface.
- `src/middleware` adds auth/rate limiting support.

Run `npm install` then `npm run dev` after populating `.env`.
