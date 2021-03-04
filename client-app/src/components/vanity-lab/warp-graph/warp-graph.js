import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import { AppContext } from 'components/context';

//Container for the view matching the route:

/**
 * Responsible for constructing and rendering the warping stream graph
 * @augments {Component<Props, State>}
 */
class WarpGraphContainer extends Component {


    state = {
        render_height: 0,
        render_width: 0,
        data_viewbox: '',
    }

    componentDidMount() {
        var {
            data_height,
            data_width,
            data_vertical_scale = 1,
            data_horizontal_scale = 1,

            data_number_of_layers = 8,
            data_number_of_samples = 200,
            data_number_of_bumps = 8,
            state_warp_graph_type = 1,
        } = this.props;

        this.setState({
            render_height: data_height * data_vertical_scale,
            render_width: data_width * data_horizontal_scale,
            data_viewbox: `0 0 ${data_width * data_horizontal_scale} ${data_height * data_vertical_scale}`,
        })


        /// Graph functionality


        const svg = d3.select("#ToastedGraph");
        let n = data_number_of_layers // number of layers 
        let m = data_number_of_samples // number of samples per layer
        let k = data_number_of_bumps // number of bumps per layer
        let x = d3.scaleLinear([0, m - 1], [0, data_width * data_horizontal_scale]);
        let y = d3.scaleLinear([0, 1], [data_height * data_vertical_scale, 0]);
        let z = d3.scaleOrdinal(['#FF6969', '#4A3457', '#E8CFDE', '#A02B5D', '#F75965']);

        let offset;

        switch (state_warp_graph_type) {
            case 1:
                offset = d3.stackOffsetWiggle;
                break;
            case 2:
                offset = d3.stackOffsetSilhouette;
                break;
            case 3:
                offset = d3.stackOffsetDiverging;
                break;
            case 4:
                offset = d3.stackOffsetExpand;
                break;
            default:
                offset = d3.stackOffsetWiggle;
        } 


        let area = d3.area()
            .x((d, i) => x(i))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]))

        let stack = d3.stack()
            .offset(offset)
            .keys(d3.range(n))
            .order(d3.stackOrderNone)

        function randomize() {
            const layers = stack(d3.transpose(Array.from({ length: n }, () => bumps(m, k))));
            y.domain([
                d3.min(layers, l => d3.min(l, d => d[0])),
                d3.max(layers, l => d3.max(l, d => d[1]))
            ]);
            return layers;
        }

        function bump(a, n) {
            const x = 1 / (0.1 + Math.random());
            const y = 2 * Math.random() - 0.5;
            const z = 10 / (0.1 + Math.random());
            for (let i = 0; i < n; ++i) {
                const w = (i / n - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        function bumps(n, m) {
            const a = [];
            for (let i = 0; i < n; ++i) a[i] = 0;
            for (let i = 0; i < m; ++i) bump(a, n);
            return a;
        }
        const path = svg.selectAll("path")
            .data(randomize)
            .join("path")
            .attr("d", area)
            .attr("fill", () => z(Math.random()));
        console.log('%c GENERATOR ', 'background: limegreen');

        async function* generatestream() {
            console.log('%c GENERATOR ', 'background: limegreen');
            while (true) {

                yield svg.node();

                await path
                    .data(randomize)
                    .transition()
                    .delay(3000)
                    .duration(500)
                    .attr("d", area)
                    .end()
            }
        }

        generatestream().next();


    }

    render() {
        var {
            data_viewbox,
        } = this.state;

        var {
            data_width,
            data_height,
        } = this.props;

        return (
            <Fragment>
                <WarpGraph
                    data_height={data_height}
                    data_width={data_width}
                    data_viewbox={data_viewbox}
                />
            </Fragment>
        );
    }
}

export default WarpGraphContainer;

WarpGraphContainer.propTypes = {
    data_height: PropTypes.number.isRequired,
    data_width: PropTypes.number.isRequired,

    data_vertical_scale: PropTypes.number,
    data_horizontal_scale: PropTypes.number,

    data_number_of_layers: PropTypes.number,
    data_number_of_samples: PropTypes.number,
    data_number_of_bumps: PropTypes.number,

    state_warp_graph_type: PropTypes.number,
}

/**
 * Responsible for constructing and rendering the stream graph
 * @augments {Component<Props, State>}
 */
const WarpGraph = (props) => {
    var {
        data_height,
        data_width,
        data_viewbox,
    } = props;

    return (
        <svg id="ToastedGraph" fill="none" width={data_width} height={data_height} viewBox={data_viewbox} />
    )
}

WarpGraph.propTypes = {
    data_height: PropTypes.number,
    data_width: PropTypes.number,
    data_viewbox : PropTypes.string, 
}


