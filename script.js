// Each sort returns its output and operation counts.
// Comparisons check two values. Writes assign an array position.
function bubbleSort(input) {
  const array = [...input];
  let comparisons = 0, writes = 0;
  for (let end = array.length - 1; end > 0; end--) {
    let swapped = false;
    for (let j = 0; j < end; j++) {
      comparisons++;
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        writes += 2;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return { array, comparisons, writes };
}

function selectionSort(input) {
  const array = [...input];
  let comparisons = 0, writes = 0;
  for (let i = 0; i < array.length - 1; i++) {
    let minimum = i;
    for (let j = i + 1; j < array.length; j++) {
      comparisons++;
      if (array[j] < array[minimum]) minimum = j;
    }
    if (minimum !== i) {
      [array[i], array[minimum]] = [array[minimum], array[i]];
      writes += 2;
    }
  }
  return { array, comparisons, writes };
}

function insertionSort(input) {
  const array = [...input];
  let comparisons = 0, writes = 0;
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0) {
      comparisons++;
      if (array[j] <= key) break;
      array[j + 1] = array[j];
      writes++;
      j--;
    }
    // Avoid writing the key back when it has not moved.
    if (j + 1 !== i) {
      array[j + 1] = key;
      writes++;
    }
  }
  return { array, comparisons, writes };
}

// Merge Sort splits the array, sorts both halves, and merges them.
function mergeSort(input) {
  const array = [...input];
  const buffer = new Array(array.length);
  let comparisons = 0, writes = 0;

  function sort(left, right) {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    sort(left, middle);
    sort(middle + 1, right);

    let i = left, j = middle + 1, k = left;
    while (i <= middle && j <= right) {
      comparisons++;
      if (array[i] <= array[j]) buffer[k++] = array[i++];
      else buffer[k++] = array[j++];
      writes++;
    }
    while (i <= middle) {
      buffer[k++] = array[i++];
      writes++;
    }
    while (j <= right) {
      buffer[k++] = array[j++];
      writes++;
    }
    // Count writes to both the temporary buffer and the result array.
    for (let index = left; index <= right; index++) {
      array[index] = buffer[index];
      writes++;
    }
  }

  sort(0, array.length - 1);
  return { array, comparisons, writes };
}

// Quick Sort uses the last value as a pivot (Lomuto partitioning).
function quickSort(input) {
  const array = [...input];
  let comparisons = 0, writes = 0;

  function swap(i, j) {
    if (i === j) return; // No array write when a value stays in place.
    [array[i], array[j]] = [array[j], array[i]];
    writes += 2;
  }

  function partition(left, right) {
    const pivot = array[right];
    let boundary = left;
    for (let j = left; j < right; j++) {
      comparisons++;
      if (array[j] <= pivot) {
        swap(boundary, j);
        boundary++;
      }
    }
    swap(boundary, right);
    return boundary;
  }

  function sort(left, right) {
    if (left >= right) return;
    const pivotIndex = partition(left, right);
    sort(left, pivotIndex - 1);
    sort(pivotIndex + 1, right);
  }

  sort(0, array.length - 1);
  return { array, comparisons, writes };
}

const algorithms = [
  { id: "bubble", name: "Bubble Sort", sort: bubbleSort },
  { id: "selection", name: "Selection Sort", sort: selectionSort },
  { id: "insertion", name: "Insertion Sort", sort: insertionSort },
  { id: "merge", name: "Merge Sort", sort: mergeSort },
  { id: "quick", name: "Quick Sort", sort: quickSort }
];

function parseInput(text) {
  const cleaned = text.trim();
  if (!cleaned) throw new Error("Please enter at least one number.");
  if (/^,|,\s*,|,\s*$/.test(cleaned)) throw new Error("A number is missing between commas. Example: 8, 3, 5, 1");
  const parts = cleaned.split(/[,\s]+/);
  if (parts.length > 50) throw new Error("Please enter no more than 50 numbers.");
  return parts.map((part) => {
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(part)) throw new Error("“" + part + "” is not a valid number. Use commas or spaces to separate numbers.");
    const number = Number(part);
    if (!Number.isFinite(number) || Math.abs(number) > 1000000000) throw new Error("Each number must be between −1 billion and 1 billion.");
    return number;
  });
}

// Every algorithm starts with a fresh copy of the same original input.
function compareAlgorithms(input) {
  const results = algorithms.map((algorithm) => {
    const result = algorithm.sort(input);
    return { id: algorithm.id, name: algorithm.name, ...result, total: result.comparisons + result.writes };
  });
  const minimum = Math.min(...results.map((result) => result.total));
  const winners = results.filter((result) => result.total === minimum);
  return { results, winners };
}

const get = (id) => document.getElementById(id);
const numbersInput = get("numbers");
const algorithmInput = get("algorithm");
const formatArray = (array) => "[" + array.join(", ") + "]";

function clearResults() {
  get("results").hidden = true;
  get("empty-note").hidden = false;
  get("input-error").hidden = true;
  numbersInput.removeAttribute("aria-invalid");
}

function showResults(input, selectedId) {
  const { results, winners } = compareAlgorithms(input);
  const selected = results.find((result) => result.id === selectedId);
  get("original-array").textContent = formatArray(input);
  get("sorted-array").textContent = formatArray(selected.array);
  get("selected-name").textContent = selected.name;
  get("selected-stats").textContent = selected.comparisons + " comparisons · " + selected.writes + " array writes";
  get("result-count").textContent = input.length + (input.length === 1 ? " number sorted" : " numbers sorted");

  const names = winners.map((result) => result.name).join(" & ");
  get("recommendation-title").textContent = winners.length === 1 ? names : "Tie: " + names;
  get("recommendation-reason").textContent = winners.length === 1
    ? names + " used " + winners[0].comparisons + " comparisons + " + winners[0].writes + " array writes = " + winners[0].total + " operations, the lowest total among these " + results.length + " algorithms for your array."
    : "These algorithms share the lowest total: " + winners[0].total + " operations each. Under this scoring rule, there is no single winner for your array.";

  get("comparison-body").innerHTML = results.map((result) => {
    const best = winners.some((winner) => winner.id === result.id);
    const badge = best ? '<span class="badge">Lowest count</span>' : "";
    const choice = result.id === selectedId ? '<span class="choice">Your choice</span>' : "";
    return '<tr class="' + (best ? "best" : "") + '"><th scope="row">' + result.name + badge + choice + "</th><td>" + result.comparisons + "</td><td>" + result.writes + "</td><td>" + result.total + "</td></tr>";
  }).join("");
  get("results").hidden = false;
  get("empty-note").hidden = true;
}

get("sort-form").addEventListener("submit", (event) => {
  event.preventDefault();
  clearResults();
  try {
    showResults(parseInput(numbersInput.value), algorithmInput.value);
  } catch (error) {
    get("input-error").textContent = error.message;
    get("input-error").hidden = false;
    numbersInput.setAttribute("aria-invalid", "true");
    numbersInput.focus();
  }
});

numbersInput.addEventListener("input", clearResults);
algorithmInput.addEventListener("change", clearResults);
get("clear").addEventListener("click", () => {
  numbersInput.value = "";
  clearResults();
  numbersInput.focus();
});

const examples = {
  mixed: "8, 3, 5, 1, 9, 2",
  nearly: "1, 2, 3, 5, 4, 6, 7, 8",
  reverse: "8, 7, 6, 5, 4, 3, 2, 1"
};
document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    numbersInput.value = examples[button.dataset.example];
    clearResults();
    numbersInput.focus();
  });
});
