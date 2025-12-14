const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Start seeding...\n");

    //CLEANING DATA
    console.log("🧹 Cleaning existing data...");
    await prisma.postTag.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log("✅ Existing data cleaned\n");

    //PASSWORD HASHING
    console.log("🔐 Hashing passwords...");
    const passwordAdmin = await bcrypt.hash("Admin1234", 10);
    const passwordUser = await bcrypt.hash("User1234", 10);
    console.log("✅ Passwords hashed\n");

    //USERS
    console.log("👤 Creating admin...");
    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@test.com",
            password: passwordAdmin,
            role: "ADMIN"
        }
    });
    console.log(`✅ Admin created: ${admin.email}`);

    console.log("👥 Creating users...");
    await prisma.user.createMany({
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
    console.log("✅ Users created\n");

    //CATEGORIES
    console.log("📂 Creating categories...");
    await prisma.category.createMany({
        data: [
            { name: "Technology" },
            { name: "Programming" },
            { name: "Lifestyle" },
            { name: "Education" },
            { name: "News" }
        ]
    });
    console.log("✅ Categories created\n");

    //TAGS
    console.log("🏷️ Creating tags...");
    await prisma.tag.createMany({
        data: [
            { name: "NodeJS" },
            { name: "Backend" },
            { name: "API" },
            { name: "Web" },
            { name: "Database" }
        ]
    });
    console.log("✅ Tags created\n");

    //FETCH RELATIONS
    console.log("📥 Fetching users, categories, and tags...");
    const allUsers = await prisma.user.findMany();
    const allCategories = await prisma.category.findMany();
    const allTags = await prisma.tag.findMany();
    console.log("✅ Data fetched\n");

    //POSTS & RELATIONS
    console.log("📝 Creating posts and tag relations...");
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

        console.log(`   📄 Post ${i} created`);
    }

    console.log("\n✅ Posts & relations seeded");
    console.log("🌱 Seeding finished successfully");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("🔌 Prisma disconnected");
    });
