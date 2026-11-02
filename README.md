# Sort Lab — Sorting and Algorithm Comparison

A simple mini project: enter numbers, select a sort, and get a sorted array and an algorithm recommendation.

## Run the project

1. Extract the ZIP using **Extract All**.
2. Open the Sorting_Algorithm_Visualizer folder.
3. Double-click index.html to open it in Chrome, Edge, or Firefox.
4. Enter numbers such as 8, 3, 5, 1, 9, 2.
5. Select Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, or Quick Sort.
6. Click **Sort & compare**.

No installation or internet is needed. Keep index.html, style.css, and script.js in the same extracted folder.

## Features

- Enter 1–50 numbers separated by commas, spaces, or newlines.
- Use negative numbers, zero, duplicates, and decimals.
- Allowed values: -1,000,000,000 to 1,000,000,000.
- Get the sorted array from your selected algorithm.
- Compare all five sorts on separate copies of the same input.
- View comparisons, array writes, total operations, and a recommendation.
- Show tied winners instead of choosing one arbitrarily.
- Try example arrays or clear the input.
- Reject invalid input with a clear error message.
- Hide old results when the input or algorithm changes.

## How the recommendation works

Total operations = value comparisons + array writes.

Each comparison and write counts as one operation. A swap writes two array positions. Loop-condition checks, local variable assignments, initial array copying, and page updates are excluded. Insertion Sort writes the key back only if it moves. Merge Sort counts writes to its temporary buffer and writes back to the result array. Quick Sort skips swaps where both positions are the same.

All algorithms receive the same original input independently. The lowest total wins; equal totals produce a tie. The recommendation is computed from actual counts, not from a hardcoded rule about the input.

"Best" means best among these five implementations under this scoring rule. It does not mean universally fastest or the best sorting algorithm that exists. It does not measure elapsed time. Different implementations or different costs for comparisons and writes can change real performance. Running all five adds work, so this is an educational comparison tool.

| Input | Bubble | Selection | Insertion | Merge | Quick | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| 1, 2, 3, 4 | 3 | 6 | 3 | 20 | 6 | Bubble and Insertion tie |
| 4, 3, 2, 1 | 18 | 10 | 15 | 20 | 10 | Selection and Quick tie |
| 1, 2, 3, 5, 4, 6, 7, 8 | 15 | 30 | 10 | 61 | 27 | Insertion |

The numeric columns show total operations. Merge Sort recursively divides the array and merges sorted halves using one reusable buffer. Quick Sort uses the last element as the pivot (Lomuto partitioning). With that simple pivot choice, sorted, reverse-sorted, and all-equal input can make Quick Sort take O(n²) time. Recursion means a function calls itself on a smaller part of the problem.

## Files and technologies

| File | Purpose |
| --- | --- |
| index.html | Input form, result sections, and comparison table. |
| style.css | Layout, colors, and responsive styles. |
| script.js | Input checking, algorithms, counting, and recommendations. |
| PROJECT_NOTES.md | Project explanation and 25 short viva answers. |

HTML creates the page, CSS styles it, and JavaScript performs the sorting. No external libraries, backend, database, or framework is used.

## Read the code in this order

1. bubbleSort(), selectionSort(), and insertionSort(): simple loops that return a sorted array and counts.
2. mergeSort() and quickSort(): recursive algorithms that return the same output format.
3. parseInput(): validates and converts the user's text into numbers.
4. compareAlgorithms(): compares totals and collects all tied winners.
5. showResults(): displays the selected output, recommendation, and table.
6. Event listeners: connect the input form and buttons to the functions.

The application has only three code files. The built-in JavaScript sort function is not used for sorting or choosing a winner.
