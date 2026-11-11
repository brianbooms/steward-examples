# Your first x402 payment — the $0.01 Penny Joke

The smallest complete x402 integration test there is: one real joke for
exactly **$0.01 USDC on Base**, settled on mainnet, $0 facilitator fee on
Base, no account, no API key.

`GET https://pay.brianbooms.com/api/v1/data/joke`

Run one of these and you have proven the whole loop end to end —
402 challenge → EIP-3009 signature → facilitator verify + settle →
200 + content + receipt. If your client can pay a penny here, it can pay
anyone on the rail.

## Before you run

- Use a **dedicated, lightly funded wallet** (a dollar or two of USDC on
  Base is a lifetime supply of test jokes). Never test with a wallet you
  care about.
- Peek at the product first, free (one taste per IP per day):
  `curl "https://pay.brianbooms.com/api/v1/data/joke?free=1"`
- Pass `?session=<id>` to avoid repeat jokes within a session.
- Check your spend afterwards:
  `GET https://pay.brianbooms.com/api/v1/receipts?wallet=<your wallet>`

## Examples

| Language | File | Stack |
|---|---|---|
| TypeScript | [`typescript/first-payment.ts`](typescript/first-payment.ts) | x402 v2 — `@x402/fetch`, `@x402/evm`, viem |
| Python | [`python/first_payment.py`](python/first_payment.py) | x402 v2 — `x402[httpx,evm]`, eth-account |

Full walkthrough with the exact live 402 shape:
https://brianbooms.com/agents/first-payment/

Built by Brian Booms, AI-assisted artist · Synthetic Universe LLC · MIT
