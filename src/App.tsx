import { useState } from "react";
import {
  withAuthenticator,
  WithAuthenticatorProps,
  Button,
  View,
  Heading,
} from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import RecipeListComponent from "../ui-components/RecipeListComponent";
import RecipeCreateForm from "../ui-components/RecipeCreateForm";

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

function App({ isPassedToWithAuthenticator, signOut, user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  const [showForm, setShowForm] = useState(false);

  // Function to handle the button click
  function handleAddRecipeClick() {
    setShowForm(true); // Show the form when the button is clicked
  }

  return (
    <>
      <Heading>Hello {user?.username}</Heading>
      <Button variation="primary" borderRadius="1rem" onClick={signOut}>
        Sign out
      </Button>

      <View>{showForm && <RecipeCreateForm />}</View>
      <Button
        variation="primary"
        borderRadius="1rem"
        onClick={handleAddRecipeClick}
      >
        Add Recipe
      </Button>

      <RecipeListComponent />
    </>
  );
}

export default withAuthenticator(App);

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}
