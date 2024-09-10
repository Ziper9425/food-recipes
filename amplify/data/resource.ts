import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  // Ingredients Table
  Ingredient: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      description: a.string().required(),
      measures: a.hasMany("Measure", "ingredientId"), // if Ingredient has many Measures
      pantryItems: a.hasMany("PantryItem", "ingredientId"), // if Ingredient has many PantryItems
    })
    .authorization((allow) => [allow.publicApiKey()]),
  // Measures Table (now linked to Ingredient)
  Measure: a
    .model({
      id: a.id().required(),
      name: a.string().required(), // e.g., grams, cups, etc.
      ingredientId: a.id().required(), // Foreign key referencing Ingredient table
      ingredient: a.belongsTo("Ingredient", "ingredientId"), // Link to the Ingredient table
      pantryItems: a.hasMany("PantryItem", "measureId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Pantry Items Table
  PantryItem: a
    .model({
      id: a.id().required(),
      ingredientId: a.id().required(),
      ingredient: a.belongsTo("Ingredient", "ingredientId"), // Foreign key relationship to Ingredients table
      quantity: a.float().required(),
      measureId: a.id().required(), // Foreign key referencing Measures table
      measure: a.belongsTo("Measure", "measureId"), // Link to the Measure table
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Recipes Table
  Recipe: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      preparation_time: a.integer(), // Minutes
      instructions: a.string().required(),
      vegetarian: a.boolean().required(),
      image: a.url(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  // .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
