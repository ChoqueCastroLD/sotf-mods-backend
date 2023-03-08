import { startServer } from "./backend/server.ts";
import { prisma } from "./backend/services/prisma.ts";

while (true) {
    try {
        console.log('Starting server...');
        let port = 8000;
        if (Deno.env.get('PORT')) {
            port = parseInt(Deno.env.get('PORT')!);
        }
        await startServer(port);
    } catch (err) {
        console.log('Server crashed, logging error and restarting in 3 seconds...');
        console.error(err);
        console.log('Disconnecting prisma');
        await prisma.$disconnect();
        console.log('Connecting prisma');
        await prisma.$connect();
    }
}