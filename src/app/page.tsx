"use client";

import Header from "@/components/Header";
import Product from "@/components/Product";
import { Product as ProductType } from "@/types/Product";
import { CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function Home() {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("/api/products"),
    enabled: !!getCookie("token"),
  });

  const data: ProductType[] = productsQuery?.data?.data?.data?.data ?? [];
  return (
    <Stack>
      <Header />
      <Stack paddingTop={10} width="80vw" marginLeft={20} gap={5}>
        {data?.length ? (
          data.map((product) => (
            <Product key={product.product_id} product={product} />
          ))
        ) : (
          <Stack direction="row" justifyContent="center" height="100vh">
            <CircularProgress />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
