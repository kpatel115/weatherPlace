import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearData() {
  await prisma.weatherLog.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.user.deleteMany({});
}

async function seedData() {
  try {
    console.log('Start seeding...');

    // Create users
    const alice = await prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice'
      },
    });
    const bob = await prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob'
      },
    });

    // Create locations
    const location1 = await prisma.location.create({
      data: {
        city: 'San Francisco',
        latitude: 37.7749,
        longitude: -122.4194,
        userId: alice.user_id, // Reference user_id
      },
    });
    const location2 = await prisma.location.create({
      data: {
        city: 'New York City',
        latitude: 40.7128,
        longitude: -74.0060,
        userId: bob.user_id, // Reference user_id
      },
    });

    // Create weather logs
    const weatherLog1 = await prisma.weatherLog.create({
      data: {
        locationId: location1.loc_id, // Reference loc_id
        description: 'Clear sky',
        temperature: 68.0,
      },
    });
    const weatherLog2 = await prisma.weatherLog.create({
      data: {
        locationId: location2.loc_id, // Reference loc_id
        description: 'Partly cloudy',
        temperature: 70.0,
      },
    });

    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearData()
seedData();

