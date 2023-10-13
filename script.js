function calculateMinCost() {
	/* Your Javascript code here. */
  const inputElement = document.getElementById("ropeInput");
  const resultElement = document.getElementById("result");

  const ropeLengths = inputElement.value.split(',').map(Number);
  const n = ropeLengths.length;

  // Create a min heap (Priority Queue)
  const minHeap = new MinHeap();
  for (let i = 0; i < n; i++) {
    minHeap.insert(ropeLengths[i]);
  }

  let totalCost = 0;
  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();

    const cost = firstRope + secondRope;
    totalCost += cost;

    minHeap.insert(cost);
  }

  resultElement.textContent = `Minimum cost of connecting ropes: ${totalCost}`;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }

    if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}

