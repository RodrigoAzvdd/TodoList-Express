const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: { type: String, require: true },
    done: { type: Boolean, default: false },
    checklistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        require: true
    }
})

module.exports = mongoose.model('Task', taskSchema)