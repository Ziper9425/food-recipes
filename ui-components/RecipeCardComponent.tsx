import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  useTheme,
} from "@aws-amplify/ui-react";
import type { Schema } from "../amplify/data/resource"

interface RecipeCardComponentProps {
  recipe: Schema["Recipe"]["type"];
  onClick?: () => void; // onClick is optional
}

const RecipeCardComponent: React.FC<RecipeCardComponentProps> = ({
  recipe,
  onClick,
}) => {
  const { tokens } = useTheme();

  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
      onClick={onClick}
    >
      <Card variation="elevated">
        <Flex direction="row" alignItems="flex-start">
          {recipe.image && (
            <Image alt={recipe.title} src={recipe.image} width="33%" />
          )}
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            <Flex>
              <Badge size="small" variation="info">
                {recipe.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
              </Badge>
            </Flex>

            <Heading level={5}>{recipe.title}</Heading>

            <Text as="span">Instructions: {recipe.instructions}</Text>
            <Text as="span">
              Preparation Time: {recipe.preparation_time ?? "N/A"} minutes
            </Text>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};

export default RecipeCardComponent;
