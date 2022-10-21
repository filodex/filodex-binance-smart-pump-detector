import express from 'express'
import path from 'path'

const app = express()
const PORT = 80
let dirname = path.resolve()
console.log(dirname)

app.use(express.static(`${dirname}\\client\\build`))

app.use('/', (req, res) => {
    res.sendFile(`${dirname}\\client\\build\\index.html`)
})

app.listen(PORT, () => {
    console.log(`Express has been started on port ${PORT}`)
})
