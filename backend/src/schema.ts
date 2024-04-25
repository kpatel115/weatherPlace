import { createSchema } from 'graphql-yoga';
import { DateTimeResolver } from 'graphql-scalars';
import { Context } from './context';

export const typeDefs = `
  type User {
    user_id: Int!
    name: String
    email: String!
    createdAt: DateTime
    locations: [Location!]!
    weatherLogs: [WeatherLog!]!
  }

  type Location {
    loc_id: Int!
    city: String!
    latitude: Float
    longitude: Float
    user: User!
    userId: Int!
    weatherLogs: [WeatherLog!]!
  }

  type WeatherLog {
    weather_id: Int!
    description: String!
    temperature: Float!
    loggedAt: DateTime
    location: Location!
    locationId: Int!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(user_id: Int!): User
    getAllLocations: [Location!]!
    getLocationById(loc_id: Int!): Location
    getAllWeatherLogs: [WeatherLog!]!
    getWeatherLogById(weather_id: Int!): WeatherLog
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(user_id: Int!, email: String, name: String): User!
    deleteUser(user_id: Int!): User!

    createLocation(city: String!, latitude: Float, longitude: Float, userId: String!): Location!
    updateLocation(loc_id: Int!, city: String, latitude: Float, longitude: Float): Location!
    deleteLocation(loc_id: Int!): Location!

    createWeatherLog(description: String!, temperature: Float!, locationId: Int!): WeatherLog!
    updateWeatherLog(weather_id: Int!, description: String, temperature: Float): WeatherLog!
    deleteWeatherLog(weather_id: Int!): WeatherLog!
  }

  scalar DateTime
`;

export const resolvers = {
  Query: {
    getAllUsers: (_parent, _args, context: Context) => context.prisma.user.findMany(),
    getUserById: (_parent, args: { user_id: string }, context: Context) => context.prisma.user.findUnique({ where: { user_id: args.user_id } }),
    getAllLocations: (_parent, _args, context: Context) => context.prisma.location.findMany(),
    getLocationById: (_parent, args: { loc_id: string }, context: Context) => context.prisma.location.findUnique({ where: { loc_id: args.loc_id } }),
    getAllWeatherLogs: (_parent, _args, context: Context) => context.prisma.weatherLog.findMany(),
    getWeatherLogById: (_parent, args: { weather_id: string }, context: Context) => context.prisma.weatherLog.findUnique({ where: { weather_id: args.weather_id } }),
  },
  Mutation: {
    createUser: async (_parent, args, context: Context) => {
      return context.prisma.user.create({
        data: {
          email: args.email,
          name: args.name
        }
      });
    },
    updateUser: async (_parent, args, context: Context) => {
      return context.prisma.user.update({
        where: { user_id: args.user_id },
        data: {
          email: args.email,
          name: args.name
        }
      });
    },
    deleteUser: async (_parent, args, context: Context) => {
      return context.prisma.user.delete({
        where: { user_id: args.user_id }
      });
    },
    // Additional mutations for Location and WeatherLog would follow the same pattern
  },
  DateTime: DateTimeResolver,
};

export const schema = createSchema({
  typeDefs,
  resolvers,
});
