import { render, screen, within } from "@testing-library/react";
import ProductsListing from "../_components/products-listing";
import { products } from "../_utils/config";

describe("Products Listing", () => {
    beforeEach(() => {
        render(<ProductsListing />)
    });

    it("renders the component", () => {
        const section = screen.getByRole("region", {name: /explore our products/i});
        expect(section).toBeInTheDocument();
    });

    it("renders the correct title", () => {
        const title = screen.getByText("Explore our products", {selector: "h2"});
        expect(title).toBeInTheDocument();
    });

    it("renders the correct description", () => {
        const description = screen.getByText("Experience the power of omnichannel integration with our products.");
        expect(description).toBeInTheDocument();
    });

    it("renders a ProductCard for each product", () => {
        const section = screen.getByRole("region", {name: /explore our products/i});
        const productCards = within(section).getAllByRole("link");
        expect(productCards).toHaveLength(products.length);
    });
});
