const mongoose = require('mongoose');
const util = require('./util');

const GuestSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true},
    createdDate: Date,
    plus: Number,
    approved: Boolean,
    approvedDate: Date
});

const GuestModel = mongoose.model('guests', GuestSchema);

module.exports = {
    connect: (url) => {
        console.log(`Connecting to ${url}`);
        mongoose.connect(url, {useNewUrlParser: true});
    },

    Guest: {
        findAll: () => {
            return GuestModel.find({})
        },
        meet: (code, data) => {
            console.debug(`Approve user with code ${code}`);
            return GuestModel.updateOne({code: code}, {
                $set: {
                    plus: data.plus,
                    approved: true,
                    approvedDate: new Date()
                }
            })
        },
        save: name => {
            return new GuestModel({
                name: name,
                code: util.generateCode(),
                createdDate: new Date()
            }).save()
        },
        delete: guestId => GuestModel.findByIdAndRemove(guestId)
    }
};