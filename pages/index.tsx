import type { NextPage } from "next";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";

interface Product {
  _id: any;
  name: string;
}

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const [newFruit, setNewFruit] = useState<string>();
  const productsQuery = useQuery("products", async () => {
    const results = await axios.get("/api/products");
    return results.data;
  });

  const setName = useMutation(
    "changeFruit",
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

  const deleteFruit = useMutation(
    "deleteFruit",
    (id) => {
      return axios.delete("/api/products", {
        data: { id: id },
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("products", { exact: true });
      },
    }
  );

  const addFruit = useMutation(
    "addFruit",
    (name) => {
      return axios.post("/api/products", { name });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("products", { exact: true });
      },
    }
  );

  return (
    <div className="flex flex-col text-[2rem] gap-y-[2rem] m-[5rem]">
      {productsQuery.isLoading ? (
        <p>Loading...</p>
      ) : productsQuery.isError ? (
        <p>An error occurred</p>
      ) : (
        productsQuery.data.map((product: Product) => (
          <>
            <li key={product._id.concat("1")}>{product.name}</li>
            <div>
              <button
                className="border-black border-4 border-solid rounded-md w-full max-w-[15rem]"
                key={product._id.concat("2")}
                onClick={() => setName.mutate(product._id as any)}
              >
                Change name
              </button>
              <button
                className="border-black border-4 border-solid rounded-md w-full max-w-[10rem] ml-[1rem]"
                key={product._id.concat("3")}
                onClick={() => deleteFruit.mutate(product._id as any)}
              >
                Delete
              </button>
            </div>
          </>
        ))
      )}
      <div className="flex flex-col">
        <label htmlFor="addFruit">Add a new fruit:</label>
        <div>
          <input
            className="border-black border-4 border-solid w-full max-w-[20rem] p-[0.5rem]"
            type="text"
            name="addFruit"
            id="addFruit"
            onChange={(event) => setNewFruit(event.target.value)}
          />
          <button
            className="border-black border-4 border-solid rounded-md w-full max-w-[10rem] ml-[1rem]"
            onClick={() => addFruit.mutate(newFruit as any)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
