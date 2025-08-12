import { render, screen } from "@testing-library/react";
import Hero from "../_components/hero";

describe('Hero', () => {
    beforeEach(() => {
        render(<Hero />);
    })
    
    it('should render the hero component', () => {
        const heroSection = screen.getByRole("region", {name: /Everything you need, all in one place/i});
        expect(heroSection).toBeInTheDocument();
    })

    it('should render the hero component with the correct title', () => {
        const title = screen.getByText(/Everything you need/i, {selector: "h1"});
        expect(title).toBeInTheDocument();
    })
});