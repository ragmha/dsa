/**
 * Frequency Queries
 *
 * You are given q queries. Each query is of the form two integers x and y.
 *
 * 1 x: Insert x in your data structure.
 * 2 y: Delete one occurence of y from your data structure, if present.
 * 3 z: Check if any integer is present whose frequency is exactly . If yes, print 1 else 0.
 * 
 * E.g
 * 
 * queries = [[1, 1], [2, 2], [3, 2], [1, 1], [1, 1], [2, 1], [3, 2]]
 * 
 * Returns [0, 1]
 * 
 */

export function frequencyQueries(queries: number[][]) {
    const freq = new Map<number, number>();
    const freqCount = new Map<number, number>(); 
    const result: number[] = [];
    
    for (const [type, val] of queries) {
        if (type === 1) {
            // Insert
            const oldFreq = freq.get(val) || 0;
            const newFreq = oldFreq + 1;
            
            freq.set(val, newFreq);
            freqCount.set(oldFreq, (freqCount.get(oldFreq) || 0) - 1);
            freqCount.set(newFreq, (freqCount.get(newFreq) || 0) + 1);
            
        } else if (type === 2) {
            // Delete
            const oldFreq = freq.get(val) || 0;
            if (oldFreq > 0) {
                const newFreq = oldFreq - 1;
                
                freq.set(val, newFreq);
                freqCount.set(oldFreq, (freqCount.get(oldFreq) || 0) - 1);
                freqCount.set(newFreq, (freqCount.get(newFreq) || 0) + 1);
            }
            
        } else if (type === 3) {
            // Check frequency
            result.push((freqCount.get(val) || 0) > 0 ? 1 : 0);
        }
    }
    
    return result;
}