class BaseGraph {
    constructor({ data, options }) {
        this.data = data;
        this.options = options;
        this.svgElement = document.querySelector(options.selector);

        if (!this.svgElement) {
            throw new Error(`SVG element with selector ${options.selector} not found`);
        }

        this.init();
    }

    init() {
        this.svgElement.innerHTML = '';
        this.setup();
        this.render();
    }

    setup() {
    }

    render() {
    }

    update(newData) {
        this.data = newData;
        this.render();
    }
    destroy() {
        this.svgElement.innerHTML = '';
    }
}

export default BaseGraph;