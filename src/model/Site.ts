import mongoose from "../database/mongodb";


const siteSchema = new mongoose.Schema({
    port: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

siteSchema.index({ port: 1, url: 1 }, { unique: true });

export default mongoose.model('Site', siteSchema);