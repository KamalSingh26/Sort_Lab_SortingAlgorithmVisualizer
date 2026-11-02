# Sorting and Algorithm Comparison — Project Notes

## Objective

To sort an array entered by the user and identify which of Bubble, Selection, Insertion, Merge, and Quick Sort uses the fewest counted operations on that input.

## Input, process, and output

| Part | Description |
| --- | --- |
| Input | Numbers and an algorithm selected by the user. |
| Validation | Check the format, range, and maximum 50 values. |
| Process | Sort separate copies and count value comparisons and array writes. |
| Output | Sorted array, comparison table, and recommendation or tied recommendations. |

Example: enter 4, 3, 2, 1 and choose Bubble Sort. The sorted array is [1, 2, 3, 4]. Bubble uses 18 total operations; Selection uses 10; Insertion uses 15; Merge uses 20; Quick uses 10. Selection and Quick tie for the lowest score. The user's selected Bubble Sort still produces the displayed correct output.

## Algorithms

Bubble Sort compares neighboring numbers and swaps them when needed. It stops early if a pass makes no swaps.

Selection Sort finds the smallest value in the remaining unsorted section and swaps it into position.

Insertion Sort holds the next value as a key, shifts larger values to the right, and inserts the key. It avoids writing the key back if it has not moved.

Merge Sort splits the array into halves, recursively sorts each half, and merges the sorted halves. It uses one temporary buffer and counts writes to that buffer and back to the result array.

Quick Sort chooses the last element as a pivot, partitions smaller or equal values to the left, and recursively sorts the two sides. It uses Lomuto partitioning and skips swaps between the same position.

## Complexity of the core sorts

| Algorithm | Best time | Average time | Worst time | Core extra space |
| --- | --- | --- | --- | --- |
| Bubble with early stop | O(n) | O(n²) | O(n²) | O(1) |
| Selection | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick (last pivot) | O(n log n) | O(n log n) | O(n²) | O(log n) average; O(n) worst |

n means the number of elements. Quick Sort's extra space is its recursion stack. Its average-time entry assumes typical random input; a last-element pivot can create unbalanced partitions on ordered or all-equal input. The app also uses O(n) storage for independent copies and outputs. Because it still runs quadratic sorts too, comparing all five remains O(n²) in the worst case.

## Recommendation rule

Total operations = comparisons + array writes, with equal weight. A swap writes two positions. Merge Sort includes writes to temporary storage as well as the result array. The counts exclude loop checks, local variables, initial array copies, and page updates. All algorithms start with the same original input. All algorithms tied for the lowest total are shown.

This measures a defined kind of work among five implementations. It does not measure real execution time or establish a universally fastest algorithm. The comparison itself is additional work. No machine learning is involved.

## Advantages and limitations

Advantages: simple code, user input, clear counts, fair starting arrays, explicit ties, and no installation.

Limitations: five algorithms, ascending order, up to 50 numbers, the documented numeric range, and no elapsed-time benchmark.

Future ideas: descending order, other pivot strategies for Quick Sort, and optional animation. These are not included.

## 25 short viva answers

**1. What does your project do?**
It sorts numbers entered by the user and recommends the included sort with the fewest counted operations.

**2. Which algorithms are included?**
Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.

**3. Which technologies are used?**
HTML, CSS, and JavaScript, with no external libraries.

**4. What does the user enter?**
Numbers separated by commas or spaces, plus an algorithm choice.

**5. What is the output?**
The selected sort's ordered array, a comparison table, and the recommended algorithm or ties.

**6. What is sorting?**
Arranging values in an order. Here the order is smallest to largest.

**7. Which data structure is used?**
A JavaScript array.

**8. How do you choose the best algorithm?**
Add each algorithm's comparisons and array writes, then find the lowest total.

**9. Is the same algorithm always recommended?**
No. The counts depend on the array.

**10. What happens when totals are equal?**
The project shows all tied winners, including a possible five-way tie.

**11. What is a comparison?**
Checking the order of two values.

**12. What is an array write?**
Assigning a value to an array position. A swap writes two positions.

**13. Why use copies of the array?**
Each algorithm must start with exactly the same input, independently.

**14. Is real execution time measured?**
No. It compares counted operations using a stated scoring rule.

**15. Is the winner universally fastest?**
No. It has the lowest score among these five implementations on this array.

**16. How is invalid input handled?**
The program displays an error and does not show sorting results.

**17. Are negatives, decimals, and duplicates supported?**
Yes, within the displayed number range.

**18. Does the app use built-in sort or machine learning?**
No. Sorting uses loops; the recommendation uses operation totals.

**19. Why can Bubble Sort do little work on sorted input?**
It completes one pass, sees no swaps, and stops early.

**20. Which algorithm often works well on nearly sorted input?**
Insertion Sort often needs few shifts. This project checks the actual counts before recommending a winner.

**21. How does Merge Sort work?**
It divides the array into halves, sorts the halves, and merges them in order.

**22. How does Quick Sort work?**
It chooses a pivot, partitions values around it, and sorts both sides recursively.

**23. What is recursion?**
A function calling itself on a smaller problem. The base case stops the calls when a section has zero or one element.

**24. Which pivot does this Quick Sort use?**
The last element. This is easy to explain, but it can give O(n²) time on sorted, reverse-sorted, or all-equal input.

**25. Why does Merge Sort count temporary-buffer writes?**
They are actual array assignments performed by the algorithm. Counting them makes the stated array-write metric consistent.

## One-minute presentation

My mini project is a sorting and algorithm comparison tool. The user enters numbers, chooses Bubble, Selection, Insertion, Merge, or Quick Sort, and clicks Sort and compare. The app displays the sorted array from the user's choice. It also sorts independent copies using all five algorithms and counts comparisons and array writes. It recommends the smallest total and displays ties clearly. I used HTML, CSS, and JavaScript without external libraries. The main learning is that sorting work depends on the input, the algorithm implementation, and how we measure performance.
