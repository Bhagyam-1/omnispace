import { render, screen } from "@testing-library/react";
import SmallNewsCard from "../../_components/news-cards/small-news-card";
import { NewsArticleCategory, NewsArticleI } from "../../_utils/types";

const mockNewsArticle: NewsArticleI = {
    uuid: "1",
    title: "News Article 1",
    description: "Description 1",
    image_url: "https://via.placeholder.com/150",
    categories: [NewsArticleCategory.Business, NewsArticleCategory.Sports],
    keywords: "Keywords 1",
    snippet: "Snippet 1",
    url: "https://via.placeholder.com/150",
    language: "en",
    published_at: "2023-01-01",
    source: "Source 1",
    relevance_score: 1,
    locale: "en",
}

describe("Small News Card", () => {
    
    it("renders the small news card correctly", () => {
        render(<SmallNewsCard item={mockNewsArticle} />);

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
    });

    it("renders the news link correctly", () => {
        render(<SmallNewsCard item={mockNewsArticle} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/news/${mockNewsArticle.uuid}`);
    });

    it("renders the title correctly", () => {
        render(<SmallNewsCard item={mockNewsArticle} />);

        const title = screen.getByRole("heading", {level: 3});
        expect(title).toHaveTextContent(mockNewsArticle.title);
    });

    it("renders the image correctly if image url is present", () => {
        render(<SmallNewsCard item={mockNewsArticle} />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", mockNewsArticle.image_url);
    });

    it("renders the image correctly if image url is not present", () => {
        render(<SmallNewsCard item={{...mockNewsArticle, image_url: ""}} />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", expect.stringContaining("newspaper.png"));
    });
});