
const sendMessageToManager = async (req, res, next) => {
    try {
        let books = await Book.find({});
        res.send(books)
    }
    catch (err) {
        next(err)
    }

}

const sendQuestionPageToManager = async (req, res, next) => {
    try {
        let books = await Book.find({});
        res.send(books)
    }
    catch (err) {
        next(err)
    }

}
const getAllDoneShiduchim = async (req, res, next) => {
    try {
        let books = await Book.find({});
        res.send(books)
    }
    catch (err) {
        next(err)
    }

}
const filterUsersCards = async (req, res, next) => {  
    try {

    }
    catch (err) {
        next(err)
    }

}
module.exports = {
    getAllDoneShiduchim,
    sendMessageToManager,
    sendQuestionPageToManager,
    filterUsersCards
}