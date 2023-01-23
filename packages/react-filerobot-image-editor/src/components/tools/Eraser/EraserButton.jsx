/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Eraser from '@scaleflex/icons/Eraser';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const EraserButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_eraser-tool-button"
    id={TOOLS_IDS.ERASER}
    label={t('eraserTool')}
    Icon={Eraser}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

EraserButton.defaultProps = {
  isSelected: false,
};

EraserButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default EraserButton;