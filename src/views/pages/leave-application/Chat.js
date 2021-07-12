/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import Avatar from 'react-avatar'
import API from '../../../api'
import { CSpinner } from '@coreui/react'
const Chat = ({ close, chatData }) => {
  const [disable, setDisable] = useState(false)
  const [UserData, setUserData] = useState({})
  const [chatComment, setChatComment] = useState({
    comment: '',
  })

  const { comment } = chatComment
  const onInputChange = (e) => {
    setChatComment({ ...chatComment, [e.target.name]: e.target.value })
  }
  const userInfo = () => {
    const userValue = JSON.parse(localStorage.getItem('lMuserDataToken'))
    console.log('userValue', userValue)
    setUserData(userValue)
  }

  const chatSubmit = (id, submitProps) => {
    id.preventDefault()
    var resetField = document.getElementById('comment')
    resetField.value = ''
    API.post(`/wp-jwt/v1/comment/${id}`, chatComment)
      .then((submitRes) => {
        console.log('submitRes', submitRes)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    userInfo()
  }, [])
  return (
    <>
      <div className="box box-warning direct-chat direct-chat-warning chat-box">
        <div className="box-header with-border">
          <h3 className="box-title">Chat Messages</h3>
          <div className="box-tools pull-right">
            <span
              data-toggle="tooltip"
              title=""
              className="badge bg-yellow"
              data-original-title="3 New Messages"
            >
              20
            </span>

            <button
              type="button"
              className="btn btn-box-tool"
              data-widget="remove"
              onClick={() => close()}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>
        {/* Chat Body Start */}
        <div className="box-body">
          <div className="direct-chat-messages">
            {!chatData ? (
              <>
                <h3 className="d-flex justify-content-center">No chat found!</h3>
              </>
            ) : (
              <>
                {chatData && chatData.length === 0 ? (
                  <div className="text-center">
                    <CSpinner color="primary" />
                  </div>
                ) : (
                  <>
                    {chatData.map((chatValue, i) => (
                      <Fragment key={i}>
                        <>
                          {chatValue.role === 'project_manager' && (
                            <>
                              <div className="direct-chat-msg">
                                <div className="direct-chat-info clearfix">
                                  <span className="direct-chat-name pull-left">
                                    {chatValue.display_name}
                                  </span>
                                  <span className="direct-chat-timestamp pull-right">
                                    {chatValue.date}
                                  </span>
                                </div>
                                <Avatar
                                  className="direct-chat-img"
                                  name={chatValue.display_name}
                                  value="86%"
                                  size="40"
                                  round={true}
                                />
                                <div className="direct-chat-text">{chatValue.chat}</div>
                              </div>
                            </>
                          )}
                          {chatValue.role === 'employee' && (
                            <>
                              <div className="direct-chat-msg right">
                                <div className="direct-chat-info clearfix">
                                  <span className="direct-chat-name pull-right">
                                    {chatValue.display_name}
                                  </span>
                                  <span className="direct-chat-timestamp pull-left">
                                    {chatValue.date}
                                  </span>
                                </div>
                                <Avatar
                                  className="direct-chat-img"
                                  name={chatValue.display_name}
                                  value="86%"
                                  size="40"
                                  round={true}
                                />
                                <div className="direct-chat-text">{chatValue.chat}</div>
                              </div>
                            </>
                          )}
                        </>
                      </Fragment>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {/* Chat Body End */}
        <div className="box-footer">
          <form>
            <div className="input-group">
              <input
                type="text"
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => onInputChange(e)}
                placeholder="Type Message ..."
                className="form-control"
              />
              <span className="input-group-btn">
                <button
                  className={
                    'btn btn-success px-4 custom_chat_btn' + ' ' + (!comment ? 'disabled' : '')
                  }
                  onClick={chatSubmit}
                >
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat
