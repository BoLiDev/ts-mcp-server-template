/** @format */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const ENV_VALUE = process.env['ENV_KEY'];

const server = new McpServer({
  name: 'MCP Template',
  version: '0.0.1',
});

server.tool('add', { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: 'text', text: String(a + b) }],
}));

server.prompt(
  'poetry',
  { topic: z.string(), tone: z.string() },
  ({ topic, tone }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `
            Write a short English poem on the topic: "${topic}"

            Requirements:
            - Tone: ${tone}
            - Length: Between 5 and 7 lines
            - Language: Use clear, modern English
            - No need to rhyme unless it fits naturally
            - Feel free to use metaphor or imagery, but avoid archaic expressions

            The poem should feel contemporary and emotionally engaging, suitable for a modern audience.
        `,
        },
      },
    ],
  })
);

async function runServer(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Template Server running...');
  console.error(`ENV_KEY: ${ENV_VALUE}`);
}

runServer().catch((error) => {
  console.error(`Error starting server: ${error}`);
});
