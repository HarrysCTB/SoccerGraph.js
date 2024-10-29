import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/soccer-graph.js',
            format: 'umd',
            name: 'soccerGraph'
        },
        {
            file: 'dist/soccer-graph.min.js',
            format: 'umd',
            name: 'soccerGraph',
            plugins: [terser()]
        }
    ],
    plugins: [
        resolve()
    ]
};