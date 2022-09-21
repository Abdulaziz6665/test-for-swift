const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginInlineTrace, ApolloServerPluginCacheControlDisabled, ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { router } = require('./express/router.js');
const path = require('path');
const modules = require('./graphql/all-modules.js');
const { verify } = require('./lib/jwt.js');

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs: modules.typeDefs, resolvers: modules.resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();

app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', '*')
  next()
})
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '../', '/public')));
app.use(router)

const httpServer = createServer(app);

app.get('/', async (req, res) => {
  res.send('ok')
})

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({
  schema,
  onConnect: (e) => {
    // console.log('connected')
  },
  onDisconnect: (e) => {
    // console.log('disconnected')
  }
}, wsServer);

async function start () {

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production', 
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginInlineTrace(),
      // ApolloServerPluginLandingPageGraphQLPlayground,
      ApolloServerPluginCacheControlDisabled(),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4010
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}
start()