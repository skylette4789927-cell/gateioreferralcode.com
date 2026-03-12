# Deploy to Cloudflare Pages

This project is configured to be deployed on Cloudflare Pages using the `@cloudflare/next-on-pages` adapter.

## Prerequisites

1.  A Cloudflare account.
2.  This repository pushed to GitHub or GitLab.

## Deployment Steps

1.  **Log in to Cloudflare Dashboard**.
2.  Go to **Compute (Workers & Pages)** -> **Pages**.
3.  Click **Connect to Git**.
4.  Select your repository (`gateioreferralcode.com`).
5.  **Configure the build settings**:
    *   **Framework preset**: `Next.js`
    *   **Build command**: `npm run pages:build`
    *   **Build output directory**: `.vercel/output/static`
6.  **Environment Variables**:
    *   If you have any environment variables (e.g., API keys), add them in the **Settings** -> **Environment variables** section.
    *   Ensure `NODE_VERSION` is set to `20` or higher if needed (usually auto-detected).
7.  Click **Save and Deploy**.

## Local Development (Optional)

To preview the Cloudflare build locally:

1.  Build the project:
    ```bash
    npm run pages:build
    ```
2.  Preview with Wrangler (requires `wrangler` installed):
    ```bash
    npx wrangler pages dev .vercel/output/static
    ```

## Important Notes

*   This project uses `next-intl` for internationalization. The middleware and routing should work out of the box on Cloudflare Pages (Edge Runtime).
*   The `pages:build` command uses `@cloudflare/next-on-pages` to transform the Next.js build output into a format compatible with Cloudflare Pages.
