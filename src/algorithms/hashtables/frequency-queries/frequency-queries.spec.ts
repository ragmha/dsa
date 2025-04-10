import { frequencyQueries } from "./frequency-queries"

describe('Frequency Queries', () => {
    it('should return [0, 1] for the first sample input', () => {
        const queries = [
            [1, 5], [1, 6], [3, 2], [1, 10],
            [1, 10], [1, 6], [2, 5], [3, 2]
        ];
        expect(frequencyQueries(queries)).toEqual([0, 1]);
    });

    it('should return [0, 1] for the second sample input', () => {
        const queries = [
            [3, 4], [2, 1003], [1, 16], [3, 1]
        ];
        expect(frequencyQueries(queries)).toEqual([0, 1]);
    });

    it('should return [0, 1, 1] for the third sample input', () => {
        const queries = [
            [1, 3], [2, 3], [3, 2], [1, 4],
            [1, 5], [1, 5], [1, 4], [3, 2],
            [2, 4], [3, 2]
        ];
        expect(frequencyQueries(queries)).toEqual([0, 1, 1]);
    });

    
});