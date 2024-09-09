import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Recipe } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RecipeUpdateFormInputValues = {
    title?: string;
    preparation_time?: number;
    instructions?: string;
    image?: string;
    vegetarian?: boolean;
};
export declare type RecipeUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    preparation_time?: ValidationFunction<number>;
    instructions?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    vegetarian?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecipeUpdateFormOverridesProps = {
    RecipeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    preparation_time?: PrimitiveOverrideProps<TextFieldProps>;
    instructions?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    vegetarian?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type RecipeUpdateFormProps = React.PropsWithChildren<{
    overrides?: RecipeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    recipe?: Recipe;
    onSubmit?: (fields: RecipeUpdateFormInputValues) => RecipeUpdateFormInputValues;
    onSuccess?: (fields: RecipeUpdateFormInputValues) => void;
    onError?: (fields: RecipeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecipeUpdateFormInputValues) => RecipeUpdateFormInputValues;
    onValidate?: RecipeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RecipeUpdateForm(props: RecipeUpdateFormProps): React.ReactElement;
