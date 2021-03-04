import React, { Component, Fragment } from 'react';
import anime from 'animejs/lib/anime.es.js'
import PropTypes from 'prop-types';

/**
 * Responsible for rendering Portal Component
 * Some Description of the component
 * @augments {Component<Props, State>}
 */
class Portal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        anime({
            targets: ['.r-5', '.r-2', '.r-3'],
            keyframes: [
                {
                    stroke: '#FEF7FE',
                },
                {
                    stroke: '#EF2268',
                },
                {
                    stroke: '#B92B68',
                },
                {
                    stroke: '#532B48',
                },
                {
                    stroke: '#842E5D',
                },

            ],
            loop: true,
            easing: 'linear',
            rotate: '+=900deg',
            duration: 6000,
        })
        anime({
            targets: ['.r-4', '.r-6', '.r-1'],
            keyframes: [
                {
                    stroke: '#F0DAF0',
                },
                {
                    stroke: '#F75965',
                },
                {
                    stroke: '#EF2268',
                },
                {
                    stroke: '#FEF7FE',
                },
                {
                    stroke: '#532B48',
                },

            ],
            rotate: '-=720deg',
            loop: true,
            easing: 'linear',
            duration: 6000,
        })
        anime({
            targets: ['.r-7'],
            keyframes: [
                { fillOpacity: 1 },
                { fillOpacity: 0 },
            ],
            loop: true,
            direction: 'alternate',
            easing: 'linear',
            duration: 12000,
        })
        anime({
            targets: ['.r-1', '.r-2', '.r-3', '.r-4', '.r-5', '.r-6'],
            keyframes: [
                { strokeDasharray: 500 },
            ],
            loop: true,
            direction: 'alternate',
            easing: 'linear',
            duration: 6000,
            delay: anime.stagger(150),
        })


    }

    render() {
        var r, CW, CH, sda, sdo;
        var { data_width, data_height } = this.props;

        if (this.data_width > 768) {
            CW = data_width;
            CH = data_height;
            r = CH;
            sda = 250;
            sdo = 60;
        } else {
            CW = data_width * 0.9;
            CH = data_height * 0.5;
            r = 0.5 * CH;
            sda = 100;
            sdo = 10;
        }


        return (
            <svg id="Portal" fill="none" width={CW} height={CH}>
                <defs>
                    <filter id="glow">
                        <fegaussianblur className="blur" result="coloredBlur" stddeviation="1"></fegaussianblur>
                        <femerge>
                            <femergenode in="coloredBlur"></femergenode>
                            <femergenode in="coloredBlur"></femergenode>
                            <femergenode in="coloredBlur"></femergenode>
                            <femergenode in="SourceGraphic"></femergenode>
                        </femerge>
                    </filter>
                </defs>
                <circle filter='url(#glow)' style={style_circle} className='r-7' cx={CW / 2} cy={CH / 2} fill='white' fillOpacity='0' stroke="#FEF7FE" strokeWidth="3" r={0.1 * r}></circle>
                <circle style={style_circle} className='r-6' cx={CW / 2} cy={CH / 2} stroke="#EF2268" strokeWidth="3" strokeDashoffset="1" strokeDasharray="25" r={0.2 * r}></circle>
                <circle style={style_circle} className='r-3' cx={CW / 2} cy={CH / 2} stroke="#FEF7FE" strokeWidth="3" strokeDashoffset="1" strokeDasharray="25" r={0.25 * r}></circle>
                <circle style={style_circle} className='r-2' cx={CW / 2} cy={CH / 2} stroke="#B92B68" strokeWidth="3" strokeDasharray="25" r={0.3 * r} strokeDashoffset="405"></circle>
                <circle style={style_circle} className='r-1' cx={CW / 2} cy={CH / 2} stroke="#532B48" strokeWidth="3" strokeDashoffset="1" r={0.4 * r} strokeDasharray="25"></circle>
                <circle style={style_circle} className='r-4' cx={CW / 2} cy={CH / 2} stroke="#F0DAF0" strokeWidth="3" strokeDashoffset="1" r={0.45 * r} strokeDasharray="25"></circle>
                <circle style={style_circle} className='r-2' cx={CW / 2} cy={CH / 2} stroke="#842E5D" strokeWidth="3" strokeDashoffset="1" strokeDasharray="25" r={0.5 * r}></circle>
                <circle style={style_circle} className='r-1' cx={CW / 2} cy={CH / 2} r={0.55 * r} stroke="#F75965" strokeWidth="3" strokeDashoffset="1" strokeDasharray="25"></circle>
                <circle style={style_circle} className='r-5' cx={CW / 2} cy={CH / 2} stroke="#532B48" strokeWidth="3" strokeDashoffset="1" strokeDasharray="25" r={0.75 * r}></circle>
                <circle style={style_circle} className='r-6' cx={CW / 2} cy={CH / 2} stroke="#B92B68" strokeWidth="3" strokeDashoffset="1" strokeDasharray="25" r={0.8 * r}></circle>
                <circle style={style_circle} cx={CW / 2} cy={CH / 2} stroke="#FEF7FE" strokeWidth="3" strokeDashoffset={sdo} strokeDasharray={sda} r={0.9 * r}></circle>

            </svg>
        )
    }

}

Portal.propTypes = {

    data_height: PropTypes.number,
    data_width: PropTypes.number,

}

export default Portal;

const style_circle = {
    transformOrigin: '50% 50%',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
}