import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    createAt: { type: Date, required: true, default: Date.now, maxlength: 20 },
    hashtags: [{ type: String, trim: true }],
    meta: {
        videos: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 }
    }
});

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.trim() ? hashtags.split(',').map(word => `#${word.replace(/[#\s]/g, '').trim()}`) : [];
});

const Video = mongoose.model("Video", videoSchema);
export default Video;