const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  const students = await prisma.student.findMany({
    orderBy: [
      {
        nameKor: 'asc',
      },
    ]
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(students)
  }
}