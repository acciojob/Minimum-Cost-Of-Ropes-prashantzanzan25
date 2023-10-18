function calculateMinCost() {
  const ropeLengthsInput = document.getElementById("rope-lengths").value;
  const ropeLengths = ropeLengthsInput.split(",").map(Number);

  // Sort the rope lengths in ascending order
  ropeLengths.sort((a, b) => a - b);

  let minCost = 0;
  while (ropeLengths.length > 1) {
    // Take the two shortest ropes
    const rope1 = ropeLengths.shift();
    const rope2 = ropeLengths.shift();

    // Calculate the cost and add it to the total
    const cost = rope1 + rope2;
    minCost += cost;

    // Insert the new rope back into the sorted list
    ropeLengths.push(cost);
    // Re-sort the list (only the last element is unsorted)
    ropeLengths.sort((a, b) => a - b);
  }

  document.getElementById("result").textContent = "Minimum cost: " + minCost;
}
