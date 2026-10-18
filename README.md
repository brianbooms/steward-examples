# Steward Examples

Worked examples, recipes, and ready-to-paste configs for
**Steward MCP** — `@brianbooms/steward-mcp` **v0.3.1**.

Steward gives any MCP-compatible agent 25 tools for x402 agent commerce:
14 paid tools ($0.01–$0.02 per call, USDC on Base, pay-per-call, settled via
x402 at call time) + 11 free discovery tools — trust verification, a merchant
directory, and spend controls with hard caps enforced before signing:
`STEWARD_MAX_SPEND_USDC` **$0.05/call** and `STEWARD_MAX_SPEND_DAY_USDC`
**$5.00/day** by default.

```bash
npx -y @brianbooms/steward-mcp   # requires Node 20+
```

## Worked examples

| Example | Repo | What it shows |
|---|---|---|
| LlamaIndex worked example | [steward-llamaindex-example](https://github.com/brianbooms/steward-llamaindex-example) | A LlamaIndex ReAct agent using Steward tools via `llama-index-tools-steward` (PyPI 0.1.0), spend caps first |
| LlamaIndex package source | [llama-index-tools-steward](https://github.com/brianbooms/llama-index-tools-steward) | `StewardToolSpec` source — the PyPI package behind the example above |
| CrewAI recipe | [steward-crewai](https://github.com/brianbooms/steward-crewai) | A two-agent crew that buys from an x402 pay-per-call rail via Steward MCP, with real on-chain receipts |
| ElizaOS plugin | [plugin-steward](https://github.com/brianbooms/plugin-steward) | Trust-first x402 micropayments as native ElizaOS actions |
| Steward skill | [steward-skills](https://github.com/brianbooms/steward-skills) | A skill that lets AI agents pay per API call in USDC on Base via x402 |
| Eval kit | [steward-eval-kit](https://github.com/brianbooms/steward-eval-kit) | A drop-in reference merchant for agent evals — agents learn to check trust + respect spend caps before paying |
| MCP server (canonical) | [steward-mcp](https://github.com/brianbooms/steward-mcp) | The server itself: 25 tools, trust verification, spend controls, merchant directory |

## MCP client configs — ready to paste

You need Node 20+ and a Base wallet funded with a few USDC. Use a dedicated,
lightly funded wallet. Your key never leaves your machine — the server uses
it only to sign per-call authorizations, after verifying the payee is
Steward's wallet (`0xa98e8c6cbc64b7bb30fd0d2015ab24814c661839`) and the price
is inside your caps.

The standard server entry (used by every JSON client below):

```json
{
  "mcpServers": {
    "steward": {
      "command": "npx",
      "args": ["-y", "@brianbooms/steward-mcp"],
      "env": {
        "STEWARD_PAYER_KEY": "0xYOUR_BASE_WALLET_PRIVATE_KEY",
        "STEWARD_MAX_SPEND_USDC": "0.05",
        "STEWARD_MAX_SPEND_DAY_USDC": "5.00"
      }
    }
  }
}
```

### Claude Desktop

Add the entry above under `"mcpServers"` in `claude_desktop_config.json`
(Settings → Developer → Edit Config), then restart the app. The same entry
also works for Claude Code (`~/.claude.json` or a project `.mcp.json`).

### Cursor

Add the entry above to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json`
(global), then restart Cursor or reload MCP servers in Settings → MCP.

### Windsurf

Add the entry above to `~/.codeium/windsurf/mcp_config.json`, then restart
Windsurf (or refresh MCP servers from the Cascade panel).

### Cline

Add the entry above to `cline_mcp_settings.json` (open it from the Cline
extension's "MCP Servers" panel in VS Code), then restart the extension host
or reload the window.

### Codex

Codex reads MCP servers from TOML — add to `~/.codex/config.toml`:

```toml
[mcp_servers.steward]
command = "npx"
args = ["-y", "@brianbooms/steward-mcp"]

[mcp_servers.steward.env]
STEWARD_PAYER_KEY = "0xYOUR_BASE_WALLET_PRIVATE_KEY"
STEWARD_MAX_SPEND_USDC = "0.05"
STEWARD_MAX_SPEND_DAY_USDC = "5.00"
```

Restart Codex. In every client, the `steward_*` tools appear in the tool list
once the host restarts.

## The caps

- `STEWARD_MAX_SPEND_USDC` — hard ceiling per single call (default `0.05`).
  The server refuses to sign above it.
- `STEWARD_MAX_SPEND_DAY_USDC` — hard ceiling per rolling 24h (default `5.00`).
- Optional: `STEWARD_RAIL_URL` (default `https://pay.brianbooms.com`).

Free tools (`steward_catalog`, `steward_directory`, `steward_receipts`,
`steward_spend_today`) never sign or spend. Check receipts any time:
`GET https://pay.brianbooms.com/api/v1/receipts?wallet=<your wallet>`

## Links

- Rail: https://pay.brianbooms.com · Manifest: https://brianbooms.com/.well-known/x402-service.json
- Terms (Fair Dealing): https://brianbooms.com/fair-dealing/

Built by Brian Booms, AI-assisted artist · Synthetic Universe LLC · MIT
