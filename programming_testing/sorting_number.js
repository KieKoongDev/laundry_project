const groupingArray = (arr) => {
    return [...new Set(arr)].map(number => {
        return arr.filter(n => n === number);
    });
};

const sortingNumber = (numbers, sorting) => {
    return sorting(numbers);
};

// usage example
const input = [2, 3, 4, 4, 34, 6, 7, 2, 3, 7, 8, 8, 8, 7, 9, 10, 41, 8];

const sortedNumber = sortingNumber(groupingArray(input), (arr) => {
    return arr
    .sort((a, b) => a[0] - b[0])
    .sort((a, b) => a.length - b.length)
    .flat();
});

console.log(sortedNumber);