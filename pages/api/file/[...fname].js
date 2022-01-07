import formidable from "formidable";
import fs from "fs";
import path from 'path'
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

function getMimeType(ext) {
    switch (ext) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        default:
            return null;
    }
}

const get = async (req, res) => {
//     var filePath = path.join(__dirname, 'myfile.mp3');
//     var stat = fileSystem.statSync(filePath);
//
//     response.writeHead(200, {
//         'Content-Type': 'audio/mpeg',
//         'Content-Length': stat.size
//     });
//
//     var readStream = fileSystem.createReadStream(filePath);
// // We replaced all the event handlers with a simple call to readStream.pipe()
//     readStream.pipe(response);
    //todo check malicious code path
    const fname = path.join(process.cwd(), req.query.fname.join("/"))
    const ext = req.query.fname.pop().split('.').pop();
    const mime = getMimeType(ext);
    if (!mime) return res.status(403).send("Wrong file type");
    const stat = await fs.statSync(fname);
    res.writeHead(200, {
         'Content-Type': mime,
         'Content-Length': stat.size
     });
    let readStream = fs.createReadStream(fname);
    readStream.pipe(res);
};



export default (req, res) => {
    req.method === "GET" ? get(req, res):res.status(405).send("Not allowed");
};
