"use server";
const apiKey = process.env.NEWS_API_KEY;

export const getDashboardNews = async (country="us", language="en", category="", search="", page=1) => {
    try {
        const dashboardNews = await Promise.all([
            getAllNews(language, category, search, page),
            getTopNews(country, language, category, search, page)
        ])
        console.log(`dashboardNews`, dashboardNews);
        if (!dashboardNews) {
            throw new Error("Failed to fetch news");
        }
        return dashboardNews.map(news => news.data).flatMap(news => news);
    } catch (error) {
        console.log(`error`, error);
        throw (error as Error).message || new Error("Failed to fetch news");
    }
}

export const getAllNews = async (language="en", category="", search="", page=1) => {
    try {
        let url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}`;
        if(category) url += `&categories=${category}`;
        if(language) url += `&language=${language}`;
        if(search) url += `&search=${search}`;
        if(page) url += `&page=${page}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`error`, error);
        throw (error as Error).message || new Error("Failed to fetch news");
    }
}

export const getTopNews = async (country="us", language="en", category="", search="", page=1) => {
    try {
        let url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}`;
        if(category) url += `&categories=${category}`;
        if(country) url += `&locale=${country}`;
        if(language) url += `&language=${language}`;
        if(search) url += `&search=${search}`;
        if(page) url += `&page=${page}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`error`, error);
        throw (error as Error).message || new Error("Failed to fetch news");
    }
}

export const getSimilarNews = async (uuid: string, language="en", category="") => {
    try {
        let url = `https://api.thenewsapi.com/v1/news/similar/${uuid}?api_token=${apiKey}`;
        if(category) url += `&categories=${category}`;
        if(language) url += `&language=${language}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`error`, error);
        throw (error as Error).message || new Error("Failed to fetch news");
    }
}

export const getNewsById = async (uuid: string) => {
    try {
        let url = `https://api.thenewsapi.com/v1/news/uuid/${uuid}?api_token=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`error`, error);
        throw (error as Error).message || new Error("Failed to fetch news");
    }
}