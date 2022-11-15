const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

exports.handler = async () => {
  const categories = await prisma.category.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      works: {
        select: {
          id: true,
          title: true,
          students: {
            select: {
              student: {
                select: {
                  nameKor: true,
                },
              },
            },
          },
          workThumbnailImage: {
            select: {
              image: true,
              width: true,
              height: true,
            },
          },
        },
      },
    },
  });

  categories[0].works = categories
      .map((category) => category.works)
      .reduce((a, b) => a.concat(b), []);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(categories)
  };
}
