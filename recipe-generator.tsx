'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [recipe, setRecipe] = useState<string | null>(null)

  const addIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient('')
    }
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const generateRecipe = () => {
    if (ingredients.length === 0) {
      alert('Please add some ingredients first!')
      return
    }

    // This is a simple mock recipe generation.
    // In a real app, you'd call an API or use a more sophisticated algorithm.
    const generatedRecipe = `
      Recipe: ${ingredients[0].charAt(0).toUpperCase() + ingredients[0].slice(1)} Surprise

      Ingredients:
      ${ingredients.map(ing => `- ${ing}`).join('\n')}

      Instructions:
      1. Preheat the oven to 350°F (175°C).
      2. Mix all ingredients in a large bowl.
      3. Transfer the mixture to a baking dish.
      4. Bake for 30 minutes or until golden brown.
      5. Let it cool for 5 minutes before serving.
      6. Enjoy your ${ingredients[0]} Surprise!
    `

    setRecipe(generatedRecipe)
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Generator</CardTitle>
          <CardDescription>Enter ingredients you have and generate a recipe!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter an ingredient"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
            />
            <Button onClick={addIngredient}>Add</Button>
          </div>
          <ScrollArea className="h-[100px] mb-4">
            <ul>
              {ingredients.map((ing, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  {ing}
                  <Button variant="destructive" size="sm" onClick={() => removeIngredient(index)}>Remove</Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Button onClick={generateRecipe} className="w-full">Generate Recipe</Button>
          {recipe && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Generated Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap">{recipe}</pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}