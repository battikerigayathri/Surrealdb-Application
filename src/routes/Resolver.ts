import { User } from "../models/User";

export const resolvers = {
    Query: {
      getUser: async (_: any, { id }: { id: string }) => {
        return await User.findById(id);
      },
      getAllUsers: async () => {
        return await User.find();
      }
    },
    Mutation: {
      createUser: async (_: any, { name, email}: any) => {
        const user = await User.create({ name, email });
        return user;
      },
      updateUser: async (_: any, { id, name, email, mobile, isVerified }: any) => {
        const user = await User.update(
          id
        );
        return user;
      },
      deleteUser: async (_: any, { id }: { id: string }) => {
        const user = await User.delete(id);
        if (user) {
          return 'User deleted successfully';
        } else {
          throw new Error('User not found');
        }
      }
    }
  };