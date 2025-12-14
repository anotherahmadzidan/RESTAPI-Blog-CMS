const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Start seeding...");

    // Hapus data (child -> parent)
    await prisma.postTag.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Password hash
    const passwordAdmin = await bcrypt.hash("Admin1234", 10);
    const passwordUser = await bcrypt.hash("User1234", 10);

    // Admin
    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@test.com",
            password: passwordAdmin,
            role: "ADMIN"
        }
    });

    // Users
    const users = await prisma.user.createMany({
        data: [
            {
                name: "User One",
                email: "user1@test.com",
                password: passwordUser
            },
            {
                name: "User Two",
                email: "user2@test.com",
                password: passwordUser
            },
            {
                name: "User Three",
                email: "user3@test.com",
                password: passwordUser
            }
        ]
    });

    // Categories
    const categories = await prisma.category.createMany({
        data: [
            { name: "Technology" },
            { name: "Programming" },
            { name: "Lifestyle" },
            { name: "Education" },
            { name: "News" }
        ]
    });

    console.log("✅ Users & categories seeded");

    console.log("🌱 Seeding finished");

    const allUsers = await prisma.user.findMany();
    const allCategories = await prisma.category.findMany();

    const tags = await prisma.tag.createMany({
        data: [
            { name: "NodeJS" },
            { name: "Backend" },
            { name: "API" },
            { name: "Web" },
            { name: "Database" }
        ]
    });
    const allTags = await prisma.tag.findMany();

    // Posts
    for (let i = 1; i <= 5; i++) {
        const post = await prisma.post.create({
            data: {
                title: `Sample Post ${i}`,
                content: `This is the content of sample post number ${i}.`,
                authorId: allUsers[i % allUsers.length].id,
                categoryId: allCategories[i % allCategories.length].id
            }
        });

        await prisma.postTag.createMany({
            data: [
                {
                    postId: post.id,
                    tagId: allTags[i % allTags.length].id
                },
                {
                    postId: post.id,
                    tagId: allTags[(i + 1) % allTags.length].id
                }
            ]
        });
    }

    console.log("✅ Posts & tags seeded");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
