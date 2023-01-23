/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Eraser } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const EraserNode = ({
  id,
  name,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  points,
  EraserCap,
  stroke,
  strokeWidth,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  tension,
  opacity,
  ...otherProps
}) => (
  <Eraser
    id={id}
    name={name}
    rotation={rotation}
    scaleX={scaleX}
    scaleY={scaleY}
    stroke={stroke}
    strokeWidth={strokeWidth}
    shadowOffsetX={shadowOffsetX}
    shadowOffsetY={shadowOffsetY}
    shadowBlur={shadowBlur}
    shadowColor={shadowColor}
    shadowOpacity={shadowOpacity}
    points={points}
    EraserCap={EraserCap}
    tension={tension}
    hitStrokeWidth={20}
    x={0}
    y={0}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  />
);

EraserNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  stroke: '#000000',
  strokeWidth: 1,
  EraserCap: 'butt', // butt/round/square
  annotationEvents: {},
  tension: undefined,
};

EraserNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  points: PropTypes.instanceOf(Array).isRequired,
  annotationEvents: PropTypes.instanceOf(Object),
  EraserCap: PropTypes.string,
  tension: PropTypes.number,
};

export default EraserNode;