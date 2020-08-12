const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        //resolve([1, 2, 3])
        reject('Things went wrong!')
    }, 2000)
})

// then() allow us to register a function to run when things go well
doWorkPromise.then((result) => {
    console.log('Success!', result)
}).catch((error) => {
    console.log('Error!', error)
})

//
//                              fulfilled
//                            /
// Promise    -- pending -->
//                            \
//                               rejected
//