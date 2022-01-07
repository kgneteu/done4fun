//disable NextJs body parsers
import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

//todo check this not async msg API resolved without sending a response for /api/file, this may result in stalled requests.
const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            return res.status(400).send(String(err));
        }
        if (!await saveFile(files.file)) {
            return res.status(400).send("File save error");
        }
        return res.status(201).send("OK");
    });
    return;
};

const saveFile = async (file) => {
    try {
        const data = fs.readFileSync(file.filepath);
        fs.writeFileSync(`./private/images/avatar/${file.originalFilename}`, data);
        await fs.unlinkSync(file.filepath);
        return true
    } catch (e) {
        return false
    }
};

export default (req, res) => {
    req.method === "POST" ? post(req, res) : res.status(405).send("Not allowed");
};
