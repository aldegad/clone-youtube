import Video from "../models/video.model";

export const home = async(req, res) => {
    try {
        const videos = await Video.find({}).sort({createAt:"desc"});
        return res.render("home", { pageTitle: "Home", videos });
    }
    catch(e) {
        return res.status("400").render("❌ Home Error", e);
    }
};
export const search = async(req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword) {
        videos = await Video.find({
            $or: [
                {
                    title: {
                        $regex: new RegExp(keyword, "i")
                    }
                },
                {
                    hashtags: {
                        $all: [new RegExp(`^#?${keyword}$`, "i")]
                    }
                }
            ]
        });
    }
    return res.render("search", {pageTitle: "Search", videos});
}

export const see = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.status("404").render("404", { pageTitle: "Video Not Found." })
    }
    return res.render("watch", { pageTitle: video.title, video });
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload" });
}
export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        const dbVideo = await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags)
        });
        console.log("✅ Video Uploaded", dbVideo);
        return res.redirect("/");
    }
    catch(e) {
        console.log("❌ Upload Video Error", e);
        return res.status(400).render("upload", { pageTitle: "Upload", errorMessage: e._message });
    }
}

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.status("404").render("404", { pageTitle: "Video Not Found." })
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
}
export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = Video.exists({_id: id});
    if(!video) {
        return res.status("404").render("404", { pageTitle: "Video Not Found." })
    }
    try {
        const dbVideo = await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashtags: Video.formatHashtags(hashtags)
        });
        console.log("✅ Video Updated", dbVideo);
        return res.redirect(`/videos/${id}`);
    }
    catch(e) {
        console.log("❌ Update Video Error", e);
        return res.status(400).render("edit", { pageTitle: `Edit: ${video.title}`, video, errorMessage: e._message });
    }
}

export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    try {
        const dbVideo = await Video.findByIdAndDelete(id);
        console.log("✅ Video Removed", dbVideo);
        return res.redirect("/");
    }
    catch(e) {
        console.log("❌ Update Remove Error", e);
        return res.status(400).send("❌ Update Remove Error: \n" + e);
    }
}