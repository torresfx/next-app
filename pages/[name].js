import { useRouter } from "next/dist/client/router";

const Name = () => {
  const router = useRouter();
  // const query = router.query;
  // const name = query.name;
  const { name } = router.query;
  return <h1>Welcome {name}</h1>;
};

export default Name;
