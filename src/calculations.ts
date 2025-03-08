// function to calculate total distance btw the lists
export function calculateListDistance(leftList: number[], rightList: number[]): number {
    // sort the lists
    const sortedLeft = [...leftList].sort((a, b) => a - b);
    const sortedRight = [...rightList].sort((a, b) => a - b);
    
    // throw error if lists length is not equal
    if (sortedLeft.length !== sortedRight.length) {
        throw new Error("Lists must have the same length");
    }
    
    // calculate total distance
    let totalDistance = 0;
    for (let i = 0; i < sortedLeft.length; i++) {
        totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
    }
    
    return totalDistance;
}

// function to calculate similarity score btw the lists
export function calculateSimilarityScore(leftList: number[], rightList: number[]): number {
    let similarityScore = 0;
    
    // calculate occurence of each item in the rightList
    const rightFreq = new Map<number, number>();
    for (const num of rightList) {
        rightFreq.set(num, (rightFreq.get(num) || 0) + 1);
    }
    
    // loop over leftList and find its occurence in the rightFreq hashMap
    // multiply the num with its frequency and add it to the sum
    for (const num of leftList) {
        const frequency = rightFreq.get(num) || 0;
        similarityScore += num * frequency;
    }
    
    return similarityScore;
}
