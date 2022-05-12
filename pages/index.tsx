import type { NextPage } from "next";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import mongoose from "mongoose";

interface Product {
  _id: any;
  name: string;
}

const Home: NextPage = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery("products", async () => {
    const results = await axios.get("/api/products");
    return results.data;
  });

  const setName = useMutation(
    (id) => {
      return axios.put("/api/products", {
        id,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("products", { exact: true });
      },
    }
  );

  return (
    <div className="text-[5rem]">
      {productsQuery.isLoading ? (
        <p>Loading...</p>
      ) : productsQuery.isError ? (
        <p>An error occurred</p>
      ) : (
        productsQuery.data.map((product: Product) => (
          <>
            <li key="1">{product.name}</li>
            <button key="2" onClick={() => setName.mutate(product._id as any)}>
              Click
            </button>
          </>
        ))
      )}
    </div>
  );
};

export default Home;
