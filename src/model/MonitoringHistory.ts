import mongoose from "../database/mongodb";


const monitoringHistory = new mongoose.Schema({
    site: {
        type: String,
        required: true,
        ref: 'Site'
    },
    status: {
        type: String,
        required: true
    },
    responseTimeMs: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('MonitoringHistory', monitoringHistory);