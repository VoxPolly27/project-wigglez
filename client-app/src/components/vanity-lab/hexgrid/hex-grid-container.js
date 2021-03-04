import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import anime from 'animejs/lib/anime.es.js'
import { darkTheme } from '../../../theme';


/**
 * Responsible for rendering Hex Grid Component
 * Some Description of the component
 * @augments {Component<Props, State>}
 */
class HexGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: null,
            y: null,
            a: null,
            isLoaded: false,
        }
    }

    componentDidMount() {
        var a;
        let CW = this.props.data_width;
        let CH = this.props.data_height;

        if (this.props.data_width > 768) {
            a = 0.04 * CH;
        } else {
            a = 0.015 * CW;
        }

        let x = Math.round(CW / (2* a * Math.sqrt(3)));
        let y = Math.round(CH / (2 * a * Math.sqrt(3)));

        this.setState({
            x: x,
            y: y,
            a: a,
            isLoaded: true,
        })
    }

    render() {
        let CH = this.props.data_height;
        let CW = this.props.data_width;
        let viewbox = `0 0 ${CW} ${CH}`;
        let { x, y, a, isLoaded } = this.state;

        let renderHexes = () => {
            if (isLoaded) {
                return (<Hexes x={x} y={y} a={a} n={x * y} />)
            }
        }

        return (
            <svg id="HexGrid" fill="none" width={CW} height={CH} viewBox={viewbox}> 
                {renderHexes()}               
            </svg>
        )
    }
}

HexGrid.propTypes = {

    data_height: PropTypes.number,
    data_width: PropTypes.number,

}

export default HexGrid;

class Hexes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const duration = this.props.n * 15;
        anime({
            targets: '.hex',
            keyframes: [
                { fill: `${darkTheme.tm_red}` },
                { fill: `${darkTheme.tm_red}` },
                {
                    fill: `${darkTheme.tm_mallow_2}`
                },
                {
                     stroke: `${darkTheme.tm_mallow_1}`,
                },
                {  fill: `${darkTheme.tm_pink}` },
                {
                    fill: `${darkTheme.tm_light}`,
                    stroke: `${darkTheme.tm_light}`,
                }
            ],
            easing: 'easeInOutExpo',
            duration: duration,
            endDelay: 2000,
            loop: true,
            delay: anime.stagger(30)
        });
    }

    render() {
        let props = this.props;
        var elements = [];
        for (var i = 0; i < props.x; i++) {
            for (var j = 1; j < props.y; j++) {
                if (Math.round(Math.random()) == 1) {
                    if (isEven(j)) {
                        elements.push(<polyline transform={HexTranslation(i, j, props.a, 1)} key={`X${i}Y${j}`} stroke={`none`} strokeWidth="0.5px" className='hex' points={HexCoordinateGenerator(props.a)} />)
                    } else {
                        elements.push(<polyline transform={HexTranslation(i, j, props.a, 0)} key={`X${i}Y${j}`} stroke={`none`} strokeWidth="0.5px" className='hex' points={HexCoordinateGenerator(props.a)} />)
                    }
                }
            }
        }

        return elements;

    }
}
function isEven(n) {
    return n % 2 == 0;
}
function HexCoordinateGenerator(a) {
    let v1 = [Math.sqrt(3)*a, 0];
    let v2 = [2 * Math.sqrt(3)*a,a];
    let v3 = [2 * Math.sqrt(3)*a, 3*a];
    let v4 = [Math.sqrt(3)*a, 4*a];
    let v5 = [0, 3*a];
    let v6 = [0, a];
    let result = +v1[0] + "," + v1[1] + " " + v2[0] + "," + v2[1] + " " + v3[0] + "," + v3[1] + " " + v4[0] + "," + v4[1] + " " + v5[0] + "," + v5[1] + " " + v6[0] + "," + v6[1] + " "+v1[0]+ "," + v1[1];

    return result
}
function HexTranslation(x, y, a, shift) {
    let xTrans = a * x * Math.sqrt(3) * 2 + (shift * a * Math.sqrt(3));
    let yTrans = y * 3 * a;
    let result = "translate(" + xTrans + "," + yTrans + ")";

    return result;
}