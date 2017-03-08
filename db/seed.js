const db = require('APP/db');

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
  {name: 'aria', email: 'aria@gmail.com', password: '123'},
  {name: 'pepper', email: 'pepper@gmail.com', password: '123'}
], user => db.model('users').create(user));

const seedRecipes = () => db.Promise.map([
  {name: 'Pasta Night', meal: 'Dinner', lastMade: '2017-02-08 17:42:32.339-05', user_id: '1'},
  {name: 'Stir fry', meal: 'Dinner', lastMade: '2016-12-08 17:42:32.339-05', user_id: '2'},
  {name: 'Chicken and Greens', meal: 'Dinner', lastMade: '2017-01-08 17:42:32.339-05', user_id: '3'},
  {name: 'Popcorn', meal: 'Snack', lastMade: '2016-03-03 17:42:32.339-05', user_id: '4'}
  ], recipe => db.model('recipes').create(recipe));

const seedIngredients = () => db.Promise.map([
  {name: 'Noodles', isCheatDay: 'Yes'},
  {name: 'Apple', isCheatDay: 'No'},
  {name: 'Chicken', isCheatDay: 'No'},
  {name: 'Ice Cream', isCheatDay: 'Yes'}
], ingredient => db.model('ingredients').create(ingredient));

const seedRecipeLines = () => db.Promise.map([
  {amount: '1 box', recipe_id: '2', ingredient_id: '1'},
  {amount: '3lbs', recipe_id: '1', ingredient_id: '2'},
  {amount: '1/2', recipe_id: '3', ingredient_id: '3'},
  {amount: '1 cup', recipe_id: '4', ingredient_id: '4'},
], line => db.model('recipelines').create(line));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedRecipes)
  .then(recipes => console.log(`Seeded ${recipes.length} recipes OK`))
  .then(seedIngredients)
  .then(ingredients => console.log(`Seeded ${ingredients.length} ingredients OK`))
  .then(seedRecipeLines)
  .then(lines => console.log(`Seeded ${lines.length} recipeLines OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
