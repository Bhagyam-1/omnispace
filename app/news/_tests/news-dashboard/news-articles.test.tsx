import { render, screen } from "@testing-library/react";
import NewsArticles from "../../_components/news-dashboard/news-articles";
import { NewsArticleCategory, NewsArticleI } from "../../_utils/types";

const mockNewsArticles: NewsArticleI[] = [
    {
        uuid: "1",
        title: "News Article 1",
        description: "Description 1",
        image_url: "https://via.placeholder.com/150",
        categories: [NewsArticleCategory.Business],
        keywords: "Keywords 1",
        snippet: "Snippet 1",
        url: "https://via.placeholder.com/150",
        language: "en",
        published_at: "2023-01-01",
        source: "Source 1",
        relevance_score: 1,
        locale: "en",
    },
    {
        uuid: "2",
        title: "News Article 2",
        description: "Description 2",
        image_url: "https://via.placeholder.com/150",
        categories: [NewsArticleCategory.Sports],
        keywords: "Keywords 2",
        snippet: "Snippet 2",
        url: "https://via.placeholder.com/150",
        language: "en",
        published_at: "2023-01-01",
        source: "Source 2",
        relevance_score: 2,
        locale: "en",
    },
];

describe("News Articles", () => {
    beforeEach(() => {
        render(<NewsArticles newsArticles={mockNewsArticles} />)
    });

    it("should render news articles", () => {
        const newsArticles = screen.getAllByRole("link");
        expect(newsArticles).toHaveLength(mockNewsArticles.length);
    })
});
