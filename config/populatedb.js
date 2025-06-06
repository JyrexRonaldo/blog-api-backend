const { faker } = require("@faker-js/faker");
const prisma = require("./prisma");

const usersData = Array.from({ length: 10 }).map((element, index) => {
  element = {
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
  return element;
});

const postsData = Array.from({ length: 20 }).map((element, index) => {
  let authorId = index + 1;
  let status = false
  if (authorId > 10) {
    authorId -= 10;
  }
  if (authorId % 2 === 0) {
    status = true
  }

  element = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    authorId,
    status
  };
  return element;
});

const commentsData = Array.from({ length: 20 }).map((element, index) => {
  let authorId = index + 1;
  if (authorId > 10) {
    authorId -= 10;
  }
  let postId = index + 1;
  if (postId > 10) {
    postId -= 10;
  }
  element = {
    comment: faker.lorem.sentence(),
    authorId,
    postId,
  };
  return element;
});

async function populateUserDb() {
  await prisma.user.createMany({
    data: usersData,
  });
  console.log({ usersData });
}

async function populatePostDb() {
  await prisma.post.createMany({
    data: postsData,
  });
  console.log(postsData);
}

async function populateCommentDb() {
  await prisma.comment.createMany({
    data: commentsData,
  });
  console.log(commentsData);
}

async function populatedb() {
  await populateUserDb();
  await populatePostDb();
  await populateCommentDb();
}

populatedb();
