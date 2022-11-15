const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

exports.handler = async (event, context) => {
    const datetime = new Date().toLocaleDateString();
    const created = new Date(datetime);
    const ipAddress = event.requestContext.identity.sourceIp;
    await prisma.viewCount.upsert({
        where: {
            created_ipAddress: {
                created: created,
                ipAddress: ipAddress,
            },
        },
        update: {},
        create: {
            created: created,
            ipAddress: ipAddress,
        },
    });
    const todayViewCount = await prisma.viewCount.findMany({
        where: {
            created: created,
        },
    });
    const allViewCount = await prisma.viewCount.findMany();

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            todayViewCount: todayViewCount.length,
            allViewCount: allViewCount.length,
        }),
    }
}