let arr = [{ name: 3 }, { name: 2 }, { name: 4 }, { name: 1 }]

/**
 * > 0	sort a after b
 * < 0	sort a before b
 */

let newarr = arr.sort((a, b) => {
    if (a.name > b.name) {
        return 1
    } else {
        return -1
    }
})

console.log(arr)
console.log(newarr)
