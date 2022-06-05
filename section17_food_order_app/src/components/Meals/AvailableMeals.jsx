import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const mealsFetchHandler = async () => {
      const response = await fetch(
        "https://react-http-8963a-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const responseData = await response.json();
      let loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      // try {
      //   setMeals(loadedMeals);
      // } catch (error) {
      //   console.log("error catch");
      //   setError(error.message);
      // }
    };
    setTimeout(() => {
      mealsFetchHandler().catch((error) => {
        setError(error.message);
      });
      setIsLoading(false);
    }, 2000);
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading ? <p>loading...</p> : error ? <p>{error}</p> : mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
