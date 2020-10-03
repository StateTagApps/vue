import Input from "@/x-html/Input";
import SocketStatus from "@/x-html/SocketStatus";
import TextHtml from "@/x-html/TextHtml";

let tags = {
    "input": Input,
    "socket-status": SocketStatus,
    "text-html": TextHtml,
}

const Manifest = Object.assign(
    ...Object
        .keys(tags)
        .map(key => ({[stateTagApp['namespace'].concat('-'.concat(key))]: tags[key]}))
);

export default Manifest;