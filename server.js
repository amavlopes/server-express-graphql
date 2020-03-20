const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

const data = [
    {
        "id": 1,
        "platform": "fpso car",
        "well": "3-rjs-646",
        "riserSetNumber": "c1433f03",
        "supplier": "bhge",
        "section": "riser bottom section",
        "function": "po",
        "lifeLength": 5.15,
        "reference": "r185e002 rc",
        "pshh": "180.0"
    },
    {
        "id": 2,
        "platform": "fpso car",
        "well": "3-rjs-646",
        "riserSetNumber": "c1433f02",
        "supplier": "bhge",
        "section": "riser intermediate section",
        "function": "po",
        "lifeLength": 5.15,
        "reference": "r185e002 rc",
        "pshh": "180.0"
    },
    {
        "id": 3,
        "platform": "fpso car",
        "well": "3-rjs-646",
        "riserSetNumber": "c1433f01",
        "supplier": "bhge",
        "section": "riser intermediate section",
        "function": "po",
        "lifeLength": 5.15,
        "reference": "r185e002 rc",
        "pshh": "180.0"
    },
    {
        "id": 4,
        "platform": "fpso car",
        "well": "3-rjs-646",
        "riserSetNumber": "c1433h03",
        "supplier": "bhge",
        "section": "riser intermediate section",
        "function": "po",
        "lifeLength": 5.01,
        "reference": "r185e002 rc",
        "pshh": "180.0"
    },
    {
        "id": 5,
        "platform": "fpso car",
        "well": "3-rjs-646",
        "riserSetNumber": "c1433e01",
        "supplier": "bhge",
        "section": "riser top section",
        "function": "po",
        "lifeLength": 5.84,
        "reference": "r185e002 rc",
        "pshh": "180.0"
    }
]

// Schema
const schema = buildSchema(`
    type PipeLifetime {
        id: Int
        platform: String
        well: String
        riserSetNumber: String
        supplier: String
        section: String
        function: String
        lifeLength: Float
        reference: String
        pshh: String
    }
    type Query {
        getAll: [PipeLifetime]
        getAllByLimit(count: Int!): [PipeLifetime]
    }
`)

// Resolver's functions
const getAll = () => data

const getAllByLimit = args => {
    if ( args.count ) {
        var count = args.count;
        return data.slice(0, count);
    } else {
        return data;
    }
}

// Resolvers
const root = {
    getAll: getAll,
    getAllByLimit: getAllByLimit,
}

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => console.log('Express graphQL server running at http://localhost:4000/graphql.'))