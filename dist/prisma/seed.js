"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    await prisma.project.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.project.createMany({
        data: [
            {
                title: 'Project Alpha',
                description: 'Deskripsi singkat proyek ini. Apa yang kamu bangun, masalah apa yang diselesaikan.',
                emoji: '🌊',
                tags: ['React', 'Tailwind'],
                demoUrl: 'https://example.com',
                githubUrl: 'https://github.com/deathmurderS',
                thumbClass: 'thumb-1',
                order: 1,
            },
            {
                title: 'Project Beta',
                description: 'Deskripsi singkat proyek ini. Teknologi apa yang digunakan dan kenapa itu menarik.',
                emoji: '📊',
                tags: ['Python', 'Pandas'],
                demoUrl: 'https://example.com',
                githubUrl: 'https://github.com/deathmurderS',
                thumbClass: 'thumb-2',
                order: 2,
            },
            {
                title: 'Project Gamma',
                description: 'Deskripsi singkat proyek ini. Highlight pencapaian atau fitur unggulan dari proyek ini.',
                emoji: '⭐',
                tags: ['Next.js', 'Prisma'],
                demoUrl: 'https://example.com',
                githubUrl: 'https://github.com/deathmurderS',
                thumbClass: 'thumb-3',
                order: 3,
            },
        ],
    });
    console.log('✅ Seeding selesai!');
}
main()
    .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map