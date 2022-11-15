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

  const isLiked = await prisma.like.findUnique({
    where: {
      workId_ipAddress: {
        workId: id,
        ipAddress: ipAddress,
      },
    },
  });

  const likeCount = await prisma.like.findMany({
    where: {
      workId: id
    }
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      isLiked: isLiked !== null,
      likeCount: likeCount.length,
    }),
  }
}