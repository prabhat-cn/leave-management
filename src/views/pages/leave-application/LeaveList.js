/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LeaveList = () => {
    const [posts, setPosts] = useState()
  const getData = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        console.log(res.data)
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
      <div>
          {
            !posts ? ('No data found!') : (
                <>
                <table>
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>User Id</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts && posts.map((post, index) => (
                                <tr key={post.index}>
                                    <td>{post.id}</td>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>
                                        <p className={post.completed ? "btn btn-success" : "btn btn-danger"}>
                                            {post.completed ? "Completed" : "Pending"}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </>
            )}
            <nav>
                <ul className="pagination">
                    <li className="page-link">1</li>
                    <li className="page-link">2</li>
                    <li className="page-link">3</li>
                    <li className="page-link">4</li>
                </ul>
            </nav>

      </div>
  )
}

export default LeaveList
