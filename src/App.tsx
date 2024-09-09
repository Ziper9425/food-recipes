import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import  RecipeCreateForm  from "../ui-components/RecipeCreateForm"
import { Authenticator, Button, View, Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();

function App() {


    const [showForm, setShowForm] = useState(false);

    // Function to handle the button click
    function handleAddRecipeClick() {
      setShowForm(true); // Show the form when the button is clicked
    }
  // const [recipes, setRecipes] = useState<Array<Schema["Recipe"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Recipe.observeQuery().subscribe({
  //     next: (data) => setRecipes([...data.items]),
  //   });
  // }, []);

  // function createRecipe() {
  //   client.models.Recipe.create({
  //     title: window.prompt("Enter the recipe title"),
  //     preparation_time: parseInt(
  //       window.prompt("Enter preparation time in minutes"),
  //       10
  //     ),
  //     instructions: window.prompt("Enter the recipe instructions"),
  //     image: window.prompt("Enter the image URL"), // Assuming the URL is provided
  //     vegetarian: window.confirm(
  //       "Is this recipe vegetarian? Click 'OK' for Yes or 'Cancel' for No."
  //     ),
  //   })
  //     .then(() => alert("Recipe created successfully!"))
  //     .catch((err) => console.error("Error creating recipe:", err));
  // }
  //   function deleteRecipe(id: string) {
  //     client.models.Recipe.delete({ id });
  //   }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View>
          <h1>{user?.signInDetails?.loginId}'s recipes</h1>
          <Flex>
            <Button
              variation="primary"
              borderRadius="1rem"
              onClick={handleAddRecipeClick}
            >
              Add Recipe
            </Button>
            {/*  <button onClick={createRecipe}>+ new</button>
          <ul>
            {recipes.map((recipe) => (
              <li onClick={() => deleteRecipe(recipe.id)} key={recipe.id}>
                {recipe.title}
              </li>
            ))}
          </ul> */}
            {showForm && (
              <RecipeCreateForm onClose={() => setShowForm(false)} />
            )}
            <button onClick={signOut}>Sign out</button>
          </Flex>
        </View>
      )}
    </Authenticator>
  );
}

export default App;
