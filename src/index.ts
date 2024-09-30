import express from "express";
import dotenv from "dotenv";
import { initDatabase } from "../src/config/SurrealDB";
import { router } from "./routes/UserRoutes";
import { typeDefs } from "./routes/Schema";
import { resolvers } from "./routes/Resolver";
import { ApolloServer } from "apollo-server-express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", router);
const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(
      `GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

// Call the function to start the server
startServer().catch((err) => {
  console.error("Failed to start server", err);
});