import { Product as ProductType } from "@/types/Product";
import { Chip, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

type Props = {
  product: ProductType;
};

const Product: FC<Props> = ({
  product: { image_url, body, prices, title },
}) => {
  const { data: session } = useSession();

  return (
    <Stack
      width="70%"
      height={350}
      direction="row"
      justifyContent="space-between"
    >
      <Stack width="60%" position="relative">
        <Image alt="prod-image" fill unoptimized src={image_url} />
      </Stack>
      <Stack width="30%" justifyContent="space-between" paddingY={5}>
        <Stack>
          <Stack>
            <h2>{title}</h2>
          </Stack>
          <Stack fontSize={8} textAlign="justify">
            {body}
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Chip
            label={`${prices[0].price} RSD`}
            sx={{ paddingX: 2, color: "#fff", backgroundColor: "#000" }}
          />
          {session && (
            <Chip
              label={`${prices[0].member_price} RSD`}
              sx={{ paddingX: 2 }}
              color="error"
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Product;
