const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  const id = +event.pathParameters.id;
  const ipAddress = event.requestContext.identity.sourceIp;
  await prisma.like.upsert({
    where: {
      workId_ipAddress: {
        workId: id,
        ipAddress: ipAddress,
      },
    },
    update: {},
    create: {
      workId: id,
      ipAddress: ipAddress,
    },
  });

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      message: 'success',
    }),
  }
}