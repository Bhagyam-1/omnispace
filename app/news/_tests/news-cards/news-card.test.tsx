import { render, screen } from "@testing-library/react";
import NewsCard from "../../_components/news-cards/news-card";
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

describe("News Card", () => {
    it("renders news card", () => {
        render(<NewsCard item={mockNewsArticle} />);
        const card = screen.getByRole("link");
        expect(card).toBeInTheDocument();
    });

    it("renders the news card link correctly", () => {
        render(<NewsCard item={mockNewsArticle} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/news/${mockNewsArticle.uuid}`);
    });

    it("renders the image correctly if image url is given", () => {
        render(<NewsCard item={mockNewsArticle} />);
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", mockNewsArticle.image_url);
    })

    it("renders the image correctl if image url is not given", () => {
        const mockNewsArticleWithoutImage: NewsArticleI = {
            ...mockNewsArticle,
            image_url: ""
        }
        render(<NewsCard item={mockNewsArticleWithoutImage} />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", expect.stringContaining("newspaper.png"));
    });

    it("renders the title of news correctly", () => {
        render(<NewsCard item={mockNewsArticle} />);

        const title = screen.getByRole("heading", {level: 2});
        expect(title).toHaveTextContent(mockNewsArticle.title);
    });

    it("renders the description correctly", () => {
        render(<NewsCard item={mockNewsArticle} />);

        const description = screen.getByText(mockNewsArticle.description);
        expect(description).toBeInTheDocument();
    });
    
    it("renders the categories correctly", () => {
        render(<NewsCard item={mockNewsArticle} />);
        
        const badgeElements = screen.getAllByText(/business|sports/i);
        expect(badgeElements).toHaveLength(mockNewsArticle.categories?.length);
    });
});