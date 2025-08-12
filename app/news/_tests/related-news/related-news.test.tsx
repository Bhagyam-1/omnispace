import { render, screen } from "@testing-library/react";
import RelatedNews from "../../_components/related-news/related-news";
import { NewsArticleI } from "../../_utils/types";
import { NewsArticleCategory } from "../../_utils/types";

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

// const relatedNews = [
//     {
//         uuid: "1",
//         title: "News Article 1",
//         description: "Description 1",
//         image_url: "https://via.placeholder.com/150",
//         categories: [NewsArticleCategory.Business, NewsArticleCategory.Sports],
//         keywords: "Keywords 1",
//         snippet: "Snippet 1",
//         url: "https://via.placeholder.com/150",
//         language: "en",
//         published_at: "2023-01-01",
//         source: "Source 1",
//         relevance_score: 1,
//         locale: "en",
//     },
//     {
//         uuid: "2",
//         title: "News Article 2",
//         description: "Description 2",
//         image_url: "https://via.placeholder.com/150",
//         categories: [NewsArticleCategory.Business, NewsArticleCategory.Sports],
//         keywords: "Keywords 2",
//         snippet: "Snippet 2",
//         url: "https://via.placeholder.com/150",
//         language: "en",
//         published_at: "2023-01-01",
//         source: "Source 2",
//         relevance_score: 2,
//         locale: "en",
//     },
// ]

describe("Related News", () => {
    it("renders the related news correctly", () => {
        render(<RelatedNews article={mockNewsArticle} />);
        
        const content = screen.getByRole("complementary", {name: "Related News"});
        expect(content).toBeInTheDocument();
    });

    // it("renders the related news title correctly", () => {
    //     render(<RelatedNews article={mockNewsArticle} />);
        
    //     const title = screen.getByRole("heading", {level: 2, name: "Related News"});
    //     expect(title).toBeInTheDocument();
    // });

    // it("renders the related news card", () => {
    //     render(<RelatedNews article={mockNewsArticle} />);
        
    //     const cardLink = screen.getAllByRole("link");
    //     expect(cardLink).toHaveLength(relatedNews.length)
    // });
});