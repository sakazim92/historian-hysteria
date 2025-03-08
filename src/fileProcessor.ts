import {calculateListDistance, calculateSimilarityScore} from './calculations.js';

export interface Result {
    distance: number;
    similarity: number;
}

export function processFileContent(content: string): Result {
    const lines = content.trim().split('\n');
    const leftList: number[] = [];
    const rightList: number[] = [];
    
    // process file line by line to populate the lists
    for (const line of lines) {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        if (isNaN(left) || isNaN(right)) {
            throw new Error(`Invalid number in line: ${line}`);
        }
        leftList.push(left);
        rightList.push(right);
    }
    
    // perform calculations on the lists
    const distance = calculateListDistance(leftList, rightList);
    const similarity = calculateSimilarityScore(leftList, rightList);
    return {distance, similarity};
}
