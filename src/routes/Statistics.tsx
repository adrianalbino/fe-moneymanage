import { useContext, useEffect, useState } from "react";
import { UserContextType } from "../context/User";
import { UserContext } from "../context/UserContext";
import categoryService from "../services/categoryService";
import entryService from "../services/entryService";
import { Category } from "../types/Category";
import { Entry } from "../types/Entry";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const bgColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const borderColorsOptn = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

export default function Statistics() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, user, account, setAccount } = useContext(
    UserContext
  ) as UserContextType;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [data, setData] = useState({});

  async function getCategories() {
    const response = await categoryService.getMyCategories(account.id, token);
    response.success && setCategories(response.data);
  }

  async function getEntries() {
    const response = await entryService.getMyEntries(account.id, token);
    response.success && setEntries(response.data);
  }

  useEffect(() => {
    (async () => {
      await getCategories();
      await getEntries();
      console.log(entries.length);
    })();
  }, []);

  // Wa na koy pake sa limpyo sa code i just want this over with
  useEffect(() => {
    (async () => {
      console.log(entries.length);
      if (categories.length != 0) {
        const labels = categories.map((c) => c.description);
        categories.map((x) => x.id);
        let prices: number[] = new Array(labels.length).fill(0);
        prices = prices.fill(0);
        for (let i = 0; i < categories.length; i++) {
          for (let j = 0; j < entries.length; j++) {
            if (entries[j].category_id === categories[i].id) {
              prices[i] += +entries[j].amount;
            }
          }
        }
        let backgroundColors: string[] = [];
        let borderColors: string[] = [];

        for (let i = 0; i < categories.length; i++) {
          backgroundColors[i] = bgColors[i];
          borderColors[i] = borderColorsOptn[i];
        }

        const dataCpy = {
          labels,
          datasets: [
            {
              label: "Total spend for category: ",
              data: prices,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        };
        setData(dataCpy);
        setLoading(false);
      }
    })();
  }, [entries, categories]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Doughnut style={{ maxHeight: "550px" }} data={data as any} />
    </div>
  );
}
