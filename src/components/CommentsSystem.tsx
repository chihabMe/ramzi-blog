"use client";

import { useState, useRef } from "react";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentsSystemProps {
  postId: string;
}

export default function CommentsSystem({ postId }: CommentsSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: "",
    email: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!newComment.content.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      const comment: Comment = {
        id: Date.now().toString(),
        author: newComment.author || "Anonyme",
        email: newComment.email,
        content: newComment.content,
        createdAt: new Date().toISOString(),
      };

      if (parentId) {
        // Add reply
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentId
              ? { ...c, replies: [...(c.replies || []), comment] }
              : c
          )
        );
        setReplyingTo(null);
      } else {
        // Add new comment
        setComments((prev) => [comment, ...prev]);
      }

      setNewComment({ author: "", email: "", content: "" });
      formRef.current?.reset();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const CommentForm = ({ parentId }: { parentId?: string }) => (
    <form
      ref={!parentId ? formRef : undefined}
      onSubmit={(e) => handleSubmit(e, parentId)}
      className="space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom *
          </label>
          <input
            type="text"
            id="author"
            value={newComment.author}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, author: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={newComment.email}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Commentaire *
        </label>
        <textarea
          id="content"
          rows={4}
          value={newComment.content}
          onChange={(e) =>
            setNewComment((prev) => ({ ...prev, content: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          placeholder="Partagez votre avis..."
          required
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting || !newComment.content.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          {isSubmitting ? "Publication..." : parentId ? "Répondre" : "Publier"}
        </button>
        {parentId && (
          <button
            type="button"
            onClick={() => setReplyingTo(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => (
    <div
      className={`${
        isReply ? "ml-8 mt-4" : ""
      } p-4 bg-white border border-gray-200 rounded-lg`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{comment.author}</h4>
            <p className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>
        {!isReply && (
          <button
            onClick={() =>
              setReplyingTo(replyingTo === comment.id ? null : comment.id)
            }
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Répondre
          </button>
        )}
      </div>

      <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>

      {replyingTo === comment.id && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <CommentForm parentId={comment.id} />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Commentaires ({comments.length})
          </h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
        </div>

        {/* Comment Form */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Laisser un commentaire
          </h3>
          <CommentForm />
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                Aucun commentaire pour le moment. Soyez le premier à commenter !
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
