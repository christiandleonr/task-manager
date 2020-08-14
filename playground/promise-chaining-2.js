require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f31be326c3fe147d896d260').then((task) => {
//     console.log(task)

//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})

    return {deletedTask, count}
}

deleteTaksAndCount('5f32f9d34f6924467c3ff890').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

