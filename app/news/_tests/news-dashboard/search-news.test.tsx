import SearchNews from "../../_components/news-dashboard/search-news";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));


describe("Search News", () => {
    const searchTimeout = 500;
    
    beforeEach(() => {
        jest.useFakeTimers();
        pushMock.mockClear();
    });
    
    afterEach(() => {
        jest.clearAllTimers();
    });

    it("renders input field", () => {
        render(<SearchNews />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    it("calls router.push with search query after debounce", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

        render(<SearchNews />);
        const input = screen.getByRole("textbox");
        
        await user.type(input, "test");
        
        jest.advanceTimersByTime(searchTimeout);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/news?search=test");
        });
    })

    it("cancel previous debounce when user types quickly", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<SearchNews />);
        const input = screen.getByRole("textbox");
        
        await user.type(input, "t");
        jest.advanceTimersByTime(200);

        await user.type(input, "ou");
        jest.advanceTimersByTime(200);

        await user.type(input, "r");
        jest.advanceTimersByTime(searchTimeout);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledTimes(1);
            expect(pushMock).toHaveBeenCalledWith("/news?search=tour");
        });
    })
});