import TextHtml from "@/x-html/TextHtml";
import Input from "@/x-html/Input";

let tags = {
    "text-html": TextHtml,
    "input": Input,
}

const Manifest = Object.assign(
    ...Object
        .keys(tags)
        .map(key => ({[stateTagApp['namespace'].concat('-'.concat(key))]: tags[key]}))
);

export default Manifest;