const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  const id = +event.pathParameters.id;
  const student = await prisma.student.findUnique({
    where: {
      id: id,
    },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      works: {
        select: {
          id: true,
          work: {
            select: {
              id: true,
              category: {
                select: {
                  name: true,
                },
              },
              title: true,
              workThumbnailImage: {
                select: {
                  image: true,
                  width: true,
                  height: true,
                },
              },
              students: {
                select: {
                  student: {
                    select: {
                      nameKor: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(student),
  }
}
