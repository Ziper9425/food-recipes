/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $condition: ModelRecipeConditionInput
    $input: CreateRecipeInput!
  ) {
    createRecipe(condition: $condition, input: $input) {
      createdAt
      id
      image
      instructions
      owner
      preparation_time
      title
      updatedAt
      vegetarian
      __typename
    }
  }
`;
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $condition: ModelRecipeConditionInput
    $input: DeleteRecipeInput!
  ) {
    deleteRecipe(condition: $condition, input: $input) {
      createdAt
      id
      image
      instructions
      owner
      preparation_time
      title
      updatedAt
      vegetarian
      __typename
    }
  }
`;
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $condition: ModelRecipeConditionInput
    $input: UpdateRecipeInput!
  ) {
    updateRecipe(condition: $condition, input: $input) {
      createdAt
      id
      image
      instructions
      owner
      preparation_time
      title
      updatedAt
      vegetarian
      __typename
    }
  }
`;
