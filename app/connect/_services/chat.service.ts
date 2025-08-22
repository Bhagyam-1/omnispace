export const fetchRooms = async (page: number, limit: number, search: string) => {
    try {
        const res = await fetch(`/api/connect/room?page=${page}&limit=${limit}&search=${search}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error("Failed to fetch rooms");
    }
}