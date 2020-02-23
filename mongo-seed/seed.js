const { MongoClient } = require('mongodb');
const Faker = require('faker');

const {
	MONGO_INITDB_ROOT_USERNAME,
	MONGO_INITDB_ROOT_PASSWORD,
	MONGO_USERNAME,
	MONGO_PASSWORD
} = process.env;

const uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

(async () => {
	try {
		await client.connect();
		console.log('Connected to the DB')

		console.log('Creating User')
		try {
			await client.db('graphqltest').addUser(
				MONGO_USERNAME,
				MONGO_PASSWORD,
				{ roles: [{ role: 'readWrite', db: 'graphqltest' }] }
			);
			console.log('User Created');
		} catch(err) {
			console.error(err.message);
		}

		console.log('Seeding DB Started')
		const seedData = [];
		for (let i = 0; i < 100; i++) {
			seedData.push({
				title: Faker.lorem.sentence(),
				author: Faker.name.findName(),
				description: Faker.lorem.paragraph(),
				topic: Faker.commerce.department(),
				url: Faker.internet.url()
			});
		}

		await client.db('graphqltest').collection('courses').insertMany(seedData);
		console.log('Seeding Successful')

		client.close();
	} catch (err) {
		console.error(err);
		process.exit(127);
	}

})();
