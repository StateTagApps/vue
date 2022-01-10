import Input from "@/x-html/Input";
import Qr from "@/x-html/Qr";
import SocketStatus from "@/x-html/SocketStatus";
import TextHtml from "@/x-html/TextHtml";

let tags = {
    "input": Input,
    "socket-status": SocketStatus,
    "text-html": TextHtml,
    "qr": Qr,
}

const Manifest = Object.assign(
    ...Object
        .keys(tags)
        .map(key => ({[stateTagApp['namespace'].concat('-'.concat(key))]: tags[key]}))
);

export default Manifest;