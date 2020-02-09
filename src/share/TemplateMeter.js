const TemplateMeter = function TemplateMeter(template) {

    function _valuesToTemplate(data) {
        let index = 0;
        return model.template.replace(/\d+/g, function (match) {
            const result = data[index];
            const prefix = Array(match.length - data[index].toString().length).fill(0).join("");
            index++;
            return prefix + result;
        });
    }

    function collapse(values) {
        return values.split(/\D/).reduce(function (total, number, index) {
            total = total + parseInt(number) * model.multipliers[index];
            return total;
        }, 0);
    }

    function expand(reduced) {
        let values = [];

        model.multipliers.reduce(function (total, current) {
            values.push(parseInt(total / current));
            return total % current;
        }, reduced);

        return _valuesToTemplate(values);
    }

    function plus(values1, values2) {
        const [collapsed1, collapsed2] = [values1, values2].map(value => collapse(value));
        return expand(collapsed1 + collapsed2);
    }

    function minus(values1, values2) {
        const [collapsed1, collapsed2] = [values1, values2].map(value => collapse(value));
        return expand(collapsed1 - collapsed2);
    }

    var model = {
        expand,
        plus,
        minus,
        collapse,
        template: template,
        multipliers: template.split(/\D/).map(i => parseInt(i) + 1)
            .slice(1)
            .concat(1)
            .map((item, index, array) => {
                return array.slice(index).reduce((ac, cur) => ac * cur, 1);
            })
    };
    return model;
};

export default TemplateMeter;
