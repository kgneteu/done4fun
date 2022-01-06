import formidable from "formidable";
import fs from "fs";

//todo route protection

//disable NextJs body parsers
export const config = {
    api: {
        bodyParser: false
    }
};

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
