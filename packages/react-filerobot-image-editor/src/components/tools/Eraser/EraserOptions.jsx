/** External Dependencies */
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


/** Internal Dependencies */
import { useAnnotation, useStore } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import getPointerOffsetPositionBoundedToObject from 'utils/getPointerOffsetPositionBoundedToObject';
import randomId from 'utils/randomId';
import { SELECT_ANNOTATION, SET_ANNOTATION } from 'actions';
import getElemDocumentCoords from 'utils/getElemDocumentCoords';

const eventsOptions = {
  passive: true,
};


const EraserOptions = ({ t }) => {
  const { dispatch, designLayer, previewGroup, config } = useStore();
  const [eraser, saveEraserDebounced, saveEraserNoDebounce] = useAnnotation(
    {
      ...config.annotationsCommon,
      ...config[TOOLS_IDS.ERASER],
      name: TOOLS_IDS.ERASER,
    },
    false,
  );
  const canvasRef = useRef(null);
  const updatedEraser = useRef({
    points: [],
    moved: false,
    id: '',
  });

  const getPointerPosition = useCallback(() => {
    const canvasBoundingRect = getElemDocumentCoords(canvasRef.current.content);
    const pos = getPointerOffsetPositionBoundedToObject(
      previewGroup,
      canvasBoundingRect,
    );

    return [
      pos.offsetX - (designLayer.attrs.xPadding || 0),
      pos.offsetY - (designLayer.attrs.yPadding || 0),
    ];
  }, []);

  const handlePointerMove = useCallback(() => {
    if (!updatedEraser.current.moved) {
      updatedEraser.current = {
        moved: true,
        id: randomId(TOOLS_IDS.ERASER),
        points: [...updatedEraser.current.points, ...getPointerPosition()],
      };

      saveEraserNoDebounce({
        id: updatedEraser.current.id,
        name: TOOLS_IDS.ERASER,
        points: updatedEraser.current.points,
      });
    } else {
      updatedEraser.current.points = updatedEraser.current.points.concat(
        getPointerPosition(),
      );

      dispatch({
        type: SET_ANNOTATION,
        payload: {
          id: updatedEraser.current.id,
          points: updatedEraser.current.points,
          dismissHistory: true,
        },
      });
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (updatedEraser.current.id) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: updatedEraser.current.id,
        },
      });
    }

    updatedEraser.current = null;
    canvasRef.current.off('mousemove touchmove', handlePointerMove);
    canvasRef.current.off('mouseleave touchcancel', handlePointerUp);
    document.removeEventListener('mouseup', handlePointerUp, eventsOptions);
    document.removeEventListener('touchend', handlePointerUp, eventsOptions);
    document.removeEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.removeEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (e.target.attrs.draggable) {
      return;
    }
    e.evt.preventDefault();

    updatedEraser.current = { points: getPointerPosition() };

    canvasRef.current.on('mousemove touchmove', handlePointerMove);
    canvasRef.current.on('mouseleave touchcancel', handlePointerUp);
    document.addEventListener('mouseup', handlePointerUp, eventsOptions);
    document.addEventListener('touchend', handlePointerUp, eventsOptions);
    document.addEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.addEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  useEffect(() => {
    canvasRef.current = designLayer?.getStage();
    if (canvasRef.current) {
      canvasRef.current.on('mousedown touchstart', handlePointerDown);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.off('mousedown touchstart', handlePointerDown);
      }
    };
  }, []);

  return (
    <AnnotationOptions
      className="FIE_eraser-tool-options"
      annotation={eraser}
      updateAnnotation={saveEraserDebounced}
      t={t}
      hidePositionField
      hideFillOption
    />
  );
};

EraserOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default EraserOptions;
