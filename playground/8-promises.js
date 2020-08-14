const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum)

//     add(sum, 5).then((second_sum) => {
//         console.log(second_sum)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e)
// })

add(1, 1).then((sum) => {
    console.log(sum)

    return add(sum, 4)

}).then((second_sum) => {
    console.log(second_sum)    
}).catch((e) => {
    console.log(e)
})


// 
//                              fulfilled
//                            /
// Promise    -- pending -->
//                            \
//                               rejected
//