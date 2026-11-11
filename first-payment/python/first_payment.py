"""Your first x402 payment: buy one Penny Joke for exactly $0.01 USDC on Base.
Proves the full loop: 402 challenge -> sign -> settle -> 200 + joke.

    pip install -r requirements.txt
    EVM_PRIVATE_KEY=0x... python first_payment.py

Use a dedicated, lightly funded wallet. Never a wallet you care about.
"""
import asyncio
import os

from eth_account import Account
from x402 import x402Client
from x402.http.clients import x402HttpxClient
from x402.mechanisms.evm import EthAccountSigner
from x402.mechanisms.evm.exact import register_exact_evm_client

JOKE_URL = "https://pay.brianbooms.com/api/v1/data/joke?session=first-payment"


async def main() -> None:
    key = os.environ.get("EVM_PRIVATE_KEY")
    if not key:
        raise SystemExit("Set EVM_PRIVATE_KEY to a throwaway Base wallet key")

    client = x402Client()
    register_exact_evm_client(
        client, EthAccountSigner(Account.from_key(key))
    )
    async with x402HttpxClient(client) as http:
        r = await http.get(JOKE_URL)
        r.raise_for_status()
        data = r.json()
    print("Paid $0.01 on Base. Your joke:")
    print(data["joke"])
    print("Order:", data.get("order_id"))


if __name__ == "__main__":
    asyncio.run(main())
