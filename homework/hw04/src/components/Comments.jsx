import React from "react";

export default function Comments({ comments }) {
  if (comments.length > 1) {
    const lastComment = comments[comments.length - 1];

    return (
      <>
        <button>View all {comments.length} comments</button>
        <p className="text-sm mb-3">
          <strong>{lastComment.user.username}</strong> {lastComment.text}
        </p>
      </>
    );
  }

  if (comments.length === 1) {
    const [comment] = comments;

    return (
      <>
        <p className="text-sm mb-3">
          <strong>{comment.user.username}</strong> {comment.text}
        </p>
      </>
    );
  }

  return null;
}