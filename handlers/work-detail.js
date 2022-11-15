const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  const id = +event.pathParameters.id;
  const work = await prisma.work.findUnique({
    where: {
      id: id,
    },
    include: {
      workBackdropImage: {
        select: {
          image: true,
          width: true,
          height: true,
        },
      },
      workThumbnailImage: {
        select: {
          image: true,
          width: true,
          height: true,
        },
      },
      mainImages: {
        select: {
          image: true,
          width: true,
          height: true,
        },
        orderBy: [
          {
            image: "asc",
          },
        ],
      },
      students: {
        select: {
          student: {
            select: {
              id: true,
              name: true,
              nameKor: true,
              email: true,
              works: {
                select: {
                  work: {
                    select: {
                      id: true,
                      workProfileImage: {
                        select: {
                          image: true,
                          height: true,
                          width: true,
                        },
                      },
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
    body: JSON.stringify(work),
  };
}