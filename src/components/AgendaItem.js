import { PropTypes } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PlayArrowIcon from 'material-ui-icons/PlayArrow'
import Delete from 'material-ui-icons/Delete'
import Description from 'material-ui-icons/Description'

import agent from '../agent'

import {
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
  AI_ACTION_LOGIC_DEL,
  REDIRECT
} from '../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaItem })
const mapDispatchToProps = dispatch => ({
  onActionMouseOver: value =>
    dispatch({ type: AI_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value =>
    dispatch({ type: AI_ACTION_MOUSE_OUT, payload: value }),
  onActionLogicDel: value =>
    dispatch({ type: AI_ACTION_LOGIC_DEL, payload: agent.Agenda.update(value) }),
  onRedirect: (value = null) =>
    dispatch({ type: REDIRECT, value: value })
})

function AgendaItem(props) {
  const {
    id,
    name,
    startedAt,
    updatedAt,
    duration,
    mouseOverId,
    isShowActions,
    onActionMouseOver,
    onActionMouseOut,
    onActionLogicDel,
    onRedirect,
    type,
    style
  } = props

  return (
    <Card
      style={style}
      elevation={isShowActions && (id === mouseOverId) ? 4 : 1}
      onMouseOver={() => onActionMouseOver(id)}
      onMouseOut={() => onActionMouseOut(id)}
    >
      <CardHeader
        title={name}
        subheader={`${startedAt}/${duration} min`}
        onClick={() => onRedirect(`/${type}/detail/${id}`)} />
      <CardActions>
        <IconButton
          aria-label="Play/pause"
          onClick={() => onRedirect(`/${type}/play/${id}`)}>
          <PlayArrowIcon />
        </IconButton>
        {type === 'agenda' &&
          <IconButton aria-label="Delete"
            onClick={() => onActionLogicDel({ id: id, isDel: true })}>
            <Delete />
          </IconButton>}
        {type === 'trash' &&
          <IconButton aria-label="Delete"
            onClick={() => onActionLogicDel({ id: id, isDel: false })}>
            <Delete />
          </IconButton>}
        <IconButton
          aria-label="Detail"
          onClick={() => onRedirect(`/${type}/detail/${id}`)}>
          <Description />
        </IconButton>
      </CardActions>
    </Card>
  )

}

AgendaItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startedAt: PropTypes.string,
  updatedAt: PropTypes.string,
  mouseOverId: PropTypes.string,
  isShowActions: PropTypes.bool,
  duration: PropTypes.number,
  currentPage: PropTypes.number,
  templates: PropTypes.array,
  onActionMouseOver: PropTypes.func,
  onActionMouseOut: PropTypes.func,
  onActionLogicDel: PropTypes.func,
  onRedirect: PropTypes.func,
  type: PropTypes.oneOf(['agenda', 'template', 'trash']),
  style: PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem)
