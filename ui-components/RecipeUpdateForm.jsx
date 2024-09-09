/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getRecipe } from "./graphql/queries";
import { updateRecipe } from "./graphql/mutations";
const client = generateClient();
export default function RecipeUpdateForm(props) {
  const {
    id: idProp,
    recipe: recipeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    preparation_time: "",
    instructions: "",
    image: "",
    vegetarian: false,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [preparation_time, setPreparation_time] = React.useState(
    initialValues.preparation_time
  );
  const [instructions, setInstructions] = React.useState(
    initialValues.instructions
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [vegetarian, setVegetarian] = React.useState(initialValues.vegetarian);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = recipeRecord
      ? { ...initialValues, ...recipeRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setPreparation_time(cleanValues.preparation_time);
    setInstructions(cleanValues.instructions);
    setImage(cleanValues.image);
    setVegetarian(cleanValues.vegetarian);
    setErrors({});
  };
  const [recipeRecord, setRecipeRecord] = React.useState(recipeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getRecipe.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getRecipe
        : recipeModelProp;
      setRecipeRecord(record);
    };
    queryData();
  }, [idProp, recipeModelProp]);
  React.useEffect(resetStateValues, [recipeRecord]);
  const validations = {
    title: [{ type: "Required" }],
    preparation_time: [],
    instructions: [{ type: "Required" }],
    image: [{ type: "URL" }],
    vegetarian: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          preparation_time: preparation_time ?? null,
          instructions,
          image: image ?? null,
          vegetarian: vegetarian ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateRecipe.replaceAll("__typename", ""),
            variables: {
              input: {
                id: recipeRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecipeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              preparation_time,
              instructions,
              image,
              vegetarian,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Preparation time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={preparation_time}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              preparation_time: value,
              instructions,
              image,
              vegetarian,
            };
            const result = onChange(modelFields);
            value = result?.preparation_time ?? value;
          }
          if (errors.preparation_time?.hasError) {
            runValidationTasks("preparation_time", value);
          }
          setPreparation_time(value);
        }}
        onBlur={() => runValidationTasks("preparation_time", preparation_time)}
        errorMessage={errors.preparation_time?.errorMessage}
        hasError={errors.preparation_time?.hasError}
        {...getOverrideProps(overrides, "preparation_time")}
      ></TextField>
      <TextField
        label="Instructions"
        isRequired={true}
        isReadOnly={false}
        value={instructions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              preparation_time,
              instructions: value,
              image,
              vegetarian,
            };
            const result = onChange(modelFields);
            value = result?.instructions ?? value;
          }
          if (errors.instructions?.hasError) {
            runValidationTasks("instructions", value);
          }
          setInstructions(value);
        }}
        onBlur={() => runValidationTasks("instructions", instructions)}
        errorMessage={errors.instructions?.errorMessage}
        hasError={errors.instructions?.hasError}
        {...getOverrideProps(overrides, "instructions")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              preparation_time,
              instructions,
              image: value,
              vegetarian,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <SwitchField
        label="Vegetarian"
        defaultChecked={false}
        isDisabled={false}
        isChecked={vegetarian}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              preparation_time,
              instructions,
              image,
              vegetarian: value,
            };
            const result = onChange(modelFields);
            value = result?.vegetarian ?? value;
          }
          if (errors.vegetarian?.hasError) {
            runValidationTasks("vegetarian", value);
          }
          setVegetarian(value);
        }}
        onBlur={() => runValidationTasks("vegetarian", vegetarian)}
        errorMessage={errors.vegetarian?.errorMessage}
        hasError={errors.vegetarian?.hasError}
        {...getOverrideProps(overrides, "vegetarian")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || recipeModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || recipeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
