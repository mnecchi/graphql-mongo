const Express = require('express');
const ExpressGraphQL = require("express-graphql");
const schema = require('./graphql/schema');
const root = require('./graphql/root');
const Mongoose = require('mongoose');

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const app = Express();

app.use('/selftest', (_, res) => {
	res.header('Content-Type', 'application/json');
	res.status(200).send({ status: 'ok' });
})

app.use("/graphql", ExpressGraphQL({
	schema,
	rootValue: root,
	graphiql: true
}));

(async () => {
	try {
		await Mongoose.connect(
			`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo/graphqltest`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		);

		app.listen(3000, () => { console.log('Listening on port 3000'); });
	} catch (err) {
		console.error(err);
		process.exit(127);
	}
})();
