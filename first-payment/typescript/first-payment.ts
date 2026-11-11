// Your first x402 payment: buy one Penny Joke for exactly $0.01 USDC on Base.
// Proves the full loop: 402 challenge -> sign -> settle -> 200 + joke.
//
//   npm install
//   EVM_PRIVATE_KEY=0x... npm run first-payment
//
// Use a dedicated, lightly funded wallet. Never a wallet you care about.
import { wrapFetchWithPayment } from "@x402/fetch";
import { x402Client } from "@x402/core/client";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

const JOKE_URL = "https://pay.brianbooms.com/api/v1/data/joke?session=first-payment";

async function main() {
  const key = process.env.EVM_PRIVATE_KEY;
  if (!key) throw new Error("Set EVM_PRIVATE_KEY to a throwaway Base wallet key");

  const signer = privateKeyToAccount(key as `0x${string}`);
  const client = new x402Client();
  client.register("eip155:8453", new ExactEvmScheme(signer)); // Base mainnet

  const fetchWithPay = wrapFetchWithPayment(fetch, client);
  const res = await fetchWithPay(JOKE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

  const data = await res.json();
  console.log("Paid $0.01 on Base. Your joke:");
  console.log(data.joke);
  console.log("Order:", data.order_id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
