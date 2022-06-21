const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');
const Candidate = require('../models/candidate');

const CandidateType = new GraphQLObjectType({
    name: 'Candidate',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        isActive: {
            type: GraphQLBoolean
        },
        isDeleted: {
            type: GraphQLBoolean
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        candidates: {
            type: new GraphQLList(CandidateType),
            async resolve(parent, args) {
                return await Candidate.find({ isDeleted: false });
            },
        },
        getCandidateById: {
            type: CandidateType,
            args: {
                id: {
                    type: (GraphQLID),
                },
            },
            async resolve(parent, args) {
                const { id } = args
                console.log(id)
                const candidateData = await Candidate.findOne({ _id: id });
                return candidateData
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a client
        createCandidate: {
            type: CandidateType,
            args: {
                name: {
                    type: (GraphQLString),
                },
                email: {
                    type: (GraphQLString)
                },
                state: {
                    type: (GraphQLString)
                },
                age: {
                    type: (GraphQLInt)
                },
            },
            async resolve(parent, args) {
                const { name, email, state, age } = args
                let newData = new Candidate({
                    name,
                    email,
                    state,
                    age,
                });
                let response = await newData.save();
                return response
            },
        },
        updateCandidate: {
            type: CandidateType,
            args: {
                name: {
                    type: (GraphQLString),
                },
                email: {
                    type: (GraphQLString)
                },
                state: {
                    type: (GraphQLString)
                },
                age: {
                    type: (GraphQLInt)
                },
                id: {
                    type: GraphQLID
                }
            },
            async resolve(parent, args) {
                const { id } = args;
                const response = await Candidate.findOneAndUpdate(
                    { _id: id },
                    { $set: args },
                    { new: true }
                );
                return response
            },
        },
        deleteCandidate: {
            type: CandidateType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            async resolve(parent, args) {
                const { id } = args;
                const response = await Candidate.findOneAndUpdate(
                    { _id: id },
                    { $set: { isDeleted: true } },
                    { new: true }
                );
                return response
            },
        }
    },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});