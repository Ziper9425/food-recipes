
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { View, Grid } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import RecipeCardComponent from "./RecipeCardComponent"

const client = generateClient<Schema>();

export default function RecipeListComponent() {
  const [recipes, setRecipes] = useState<Array<Schema["Recipe"]["type"]>>([]);

  // 1. useEffect to update the list when change happens
  useEffect(() => {
    client.models.Recipe.observeQuery().subscribe({
      next: (data) => setRecipes([...data.items]),
    });
  }, []);

  // 2. useEffect to fetch all recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await client.models.Recipe.list();
        setRecipes(response.data); 
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(); // Call the fetch function
  }, []);

  function deleteRecipe(id: string) {
    client.models.Recipe.delete({ id });
  }

  return (
    <>
      <View>
        <h1>All Recipes</h1>
        {/* 4. Iterate over the recipes and display them */}
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <Grid templateColumns="1fr 1fr 1fr">
            {recipes.map((recipe) => (
              <RecipeCardComponent
                key={recipe.id}
                recipe={recipe}
                onClick={() => deleteRecipe(recipe.id)}
              />
            ))}
          </Grid>
        )}
      </View>
    </>
  );
}
