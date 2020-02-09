import TemplateMeter from "./TemplateMeter.js";

const SRTool = function SRTool(content) {

    const templateMeterInstance = new TemplateMeter("00:59:59,999");

    function _lineToText(line) {
        return `${line.index}\n${line.begin}  --> ${line.end}\n${line.text}`;
    }

    function plus(value) {
        return model.lines.map(function (line) {
            return _lineToText({
                index: line.index,
                begin: templateMeterInstance.plus(line.begin, value),
                end: templateMeterInstance.plus(line.begin, value),
                text: line.text
            });
        }).join("\n\n");
    }

    function minus(value) {
        return model.lines.map(function (line) {
            return _lineToText({
                index: line.index,
                begin: templateMeterInstance.minus(line.begin, value),
                end: templateMeterInstance.minus(line.begin, value),
                text: line.text
            });
        }).join("\n\n");
    }

    const model = {
        plus,
        minus,
        content,
        lines: content.split("\n\n").map(function (line) {
            const pattern = "([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}) --> ([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3})\n([^]+)";
            const beginEndContent = line.match(new RegExp(pattern, "i"));
            return {
                index: line.match(/([0-9]+)\n/)[1],
                begin: beginEndContent[1],
                end: beginEndContent[2],
                text: beginEndContent[3]
            };
        })
    };
    return model;
};
export default SRTool;


