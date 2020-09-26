import TextHtml from "@/x-html/TextHtml";
import Input from "@/x-html/Input";

let tags = {
    'input': Input,
    "text-html": TextHtml
}

const Manifest = Object.assign(...Object.keys(tags).map(key => ({[stateTagApp['namespace'].concat('-'.concat(key))]: tags[key]})))

export default Manifest;