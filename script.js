document.getElementById("calculateCost").addEventListener("click", () => {
    const ropeLengthsInput = document.getElementById("ropeLengths").value;
    const ropeLengths = ropeLengthsInput.split(',').map(Number);
    const minCost = calculateMinimumCost(ropeLengths);
    document.getElementById("result").textContent = `Minimum Cost: ${minCost}`;
});

function calculateMinimumCost(ropeLengths) {
    // Initialize a min-heap (Priority Queue)
    const minHeap = new MinHeap();

    // Add all the rope lengths to the min-heap
    for (const length of ropeLengths) {
        minHeap.insert(length);
    }

    let totalCost = 0;

    // Merge ropes until only one rope is left in the heap
    while (minHeap.size() > 1) {
        const firstRope = minHeap.extractMin();
        const secondRope = minHeap.extractMin();

        const currentCost = firstRope + secondRope;
        totalCost += currentCost;

        minHeap.insert(currentCost);
    }

    return totalCost;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }

        const min = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }

        return min;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) {
                break;
            }
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    sinkDown(index) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        let smallest = index;

        if (leftIndex < this.heap.length && this.heap[leftIndex] < this.heap[smallest]) {
            smallest = leftIndex;
        }
        if (rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[smallest]) {
            smallest = rightIndex;
        }

        if (smallest !== index) {
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            this.sinkDown(smallest);
        }
    }
}
