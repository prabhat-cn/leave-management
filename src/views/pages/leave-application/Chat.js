/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../api'

const Chat = ({ close, chatData }) => {
  const [UserData, setUserData] = useState({})
  const userInfo = () => {
    const userValue = JSON.parse(localStorage.getItem('lMuserDataToken'))
    console.log('userValue', userValue)
    setUserData(userValue)
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
            {chatData.map((chatValue, i) => (
              <Fragment key={i}>
                {chatValue.user_id === '55' && (
                  <>
                    <div className="direct-chat-msg">
                      <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-left">{chatValue.display_name}</span>
                        <span className="direct-chat-timestamp pull-right">{chatValue.date}</span>
                      </div>
                      <img
                        className="direct-chat-img"
                        src="https://img.icons8.com/color/36/000000/administrator-male.png"
                        alt="message user image"
                      />
                      <div className="direct-chat-text">{chatValue.chat}</div>
                    </div>
                  </>
                )}
                {chatValue.user_id === '50' && (
                  <>
                    <div className="direct-chat-msg right">
                      <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-right">
                          {chatValue.display_name}
                        </span>
                        <span className="direct-chat-timestamp pull-left">{chatValue.date}</span>
                      </div>
                      <img
                        className="direct-chat-img"
                        src="https://img.icons8.com/office/36/000000/person-female.png"
                        alt="message user image"
                      />
                      <div className="direct-chat-text">{chatValue.chat}</div>
                    </div>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        {/* Chat Body End */}
        <div className="box-footer">
          <form action="#" method="post">
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Type Message ..."
                className="form-control"
              />
              <span className="input-group-btn">
                <button type="button" className="btn btn-flat custom_chat_btn">
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
