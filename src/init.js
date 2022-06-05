import "./db";
import "./models/user.model";
import "./models/video.model";
import app from "./server";

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Listen server on port http://localhost:${PORT} 🚀`));