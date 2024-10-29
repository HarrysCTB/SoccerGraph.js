import BubbleGraph from '../graphs/BubbleGraph';

const createGraph = (config) => {
    const { type, data, options } = config;

    if (!type || !data || !options || !options.selector) {
        throw new Error('Invalid configuration: "type", "data", and "options.selector" are required');
    }

    switch (type) {
        case 'bubble':
            return new BubbleGraph({ data, options });
        default:
            throw new Error(`Graph type "${type}" is not supported`);
    }
};

export default createGraph;