/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Pen } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const PenNode = ({
  id,
  name,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  points,
  PenCap,
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
  <Pen
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
    PenCap={PenCap}
    tension={tension}
    hitStrokeWidth={20}
    x={0}
    y={0}
    opacity={opacity}
    {...annotationEvents}
    {...otherProps}
  />
);

PenNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  stroke: '#000000',
  strokeWidth: 1,
  PenCap: 'butt', // butt/round/square
  annotationEvents: {},
  tension: undefined,
};

PenNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  points: PropTypes.instanceOf(Array).isRequired,
  annotationEvents: PropTypes.instanceOf(Object),
  PenCap: PropTypes.string,
  tension: PropTypes.number,
};

export default PenNode;