/* Your CSS code here. */
// Define a min-heap data structure
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Function to heapify the array
  heapify() {
    let n = this.heap.length;
    for (let i = Math.floor(n / 2); i >= 0; i--) {
      this.minHeapify(i);
    }
  }

  // Function to swap two elements in the heap
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // Function to maintain the min-heap property
  minHeapify(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.minHeapify(smallest);
    }
  }

  // Function to insert a new element into the heap
  insert(value) {
    this.heap.push(value);
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Function to extract the minimum element from the heap
  extractMin() {
    if (this.heap.length === 0) return -1;

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.minHeapify(0);
    return minValue;
  }
}

// Function to find the minimum cost of connecting ropes
function findMinimumCostRopes(lengths) {
  const minHeap = new MinHeap();

  // Add all rope lengths to the min heap
  for (let i = 0; i < lengths.length; i++) {
    minHeap.insert(lengths[i]);
  }

  let totalCost = 0;

  // Continue connecting ropes until only one rope remains in the heap
  while (minHeap.heap.length > 1) {
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();
    const cost = min1 + min2;
    totalCost += cost;
    minHeap.insert(cost);
  }

  return totalCost;
}

// Get the input from the user and display the result
const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');

inputElement.addEventListener('input', function () {
  const inputText = inputElement.value;
  const ropeLengths = inputText.split(',').map(Number);

  const minimumCost = findMinimumCostRopes(ropeLengths);
  resultElement.innerText = `Minimum cost of connecting ropes: ${minimumCost}`;
});
