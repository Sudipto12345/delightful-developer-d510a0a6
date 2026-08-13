import { createFileRoute } from '@tanstack/react-router'
import { testAirwallexConnection } from '@/lib/airwallex-test.functions'

export const Route = createFileRoute('/api/public/airwallex-test')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // This is a bridge for the browser to call the server function for diagnostics
        // We'll trust the server function's internal auth check
        try {
          // We manually invoke the server function handler logic since we are in a raw handler
          // But actually, it's easier to just call it if we were using useServerFn
          // Since we want a raw endpoint for easy testing:
          const result = await testAirwallexConnection();
          return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  }
})
