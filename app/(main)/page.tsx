import Hero from "./_components/hero";
import ProductsListing from "./_components/products-listing";

const Home = async() => {
  return (
    <>
      <Hero />
      <ProductsListing />
    </>
  );
}

export default Home;