import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCommentsRequest,
  deleteCommentRequest,
  updateCommentRequest
} from '../actions'
import { getAllComments } from '../reducers'
import CommentList from '../components/CommentList'

class CommentListContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const { todoId, fetchComments } = this.props
    if (
      nextProps.todoId > 0 &&
      nextProps.todoId !== todoId
    ) {
      fetchComments(nextProps.todoId)
    }
  }

  render() {
    return (
      <CommentList {...this.props} />
    )
  }
}

function mapStateToProps(state, { todoId }) {
  return {
    comments: getAllComments(state),
    todoId
  }
}

function mapActionsToProps(dispatch) {
  return {
    fetchComments(todoId) {
      dispatch(fetchCommentsRequest(todoId))
    },
    deleteComment(todoId, id) {
      dispatch(deleteCommentRequest(todoId, id))
    },
    updateComment(todoId, id, changes) {
      dispatch(updateCommentRequest(todoId, id, changes))
    }
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CommentListContainer)
