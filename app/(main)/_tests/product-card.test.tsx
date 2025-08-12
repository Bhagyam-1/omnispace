import { render, screen } from "@testing-library/react";
import { products } from "../_utils/config";
import ProductCard from "../_components/product-card";

describe("Product Card", () => {
    const product = products[0];
    beforeEach(() => {
        render(<ProductCard product={product} />);
    });

    it("render the component", () => {
        const card = screen.getByRole("link");
        expect(card).toBeInTheDocument();
    });

    it("renders the product link correctly", () => {
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", product.link);
    })

    it("renders the title correctly", () => {
        const title = screen.getByText(product.name);
        expect(title).toBeInTheDocument();
    });

    it("renders the description correctly", () => {
        const description = screen.getByText(product.description);
        expect(description).toBeInTheDocument();
    });
    
    it("renders the product icon correctly", () => {
        const icon = screen.getByLabelText(product.name);
        expect(icon).toBeInTheDocument();
    })
});