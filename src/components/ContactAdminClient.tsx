"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Contact } from "@/sanity/types";

interface ContactMessageProps {
  message: Contact;
  onUpdate: (id: string, updates: Partial<Contact>) => void;
}

function ContactMessage({ message, onUpdate }: ContactMessageProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (
    isRead?: boolean,
    status?: Contact["status"]
  ) => {
    setIsUpdating(true);
    try {
      const updates: any = {};
      if (typeof isRead === "boolean") updates.isRead = isRead;
      if (status) updates.status = status;

      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: message._id, ...updates }),
      });

      if (response.ok) {
        onUpdate(message._id, updates);
      }
    } catch (error) {
      console.error("Failed to update message:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "default" as const;
      case "in-progress":
        return "secondary" as const;
      case "replied":
        return "outline" as const;
      case "closed":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg">{message.subject}</h3>
            {!message.isRead && (
              <Badge variant="destructive" className="text-xs">
                Unread
              </Badge>
            )}
            <Badge variant={getStatusBadgeVariant(message.status)}>
              {message.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="font-medium">{message.name}</span>
            <span>{message.email}</span>
            <span>{formatDate(message.submittedAt)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.message}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {!message.isRead && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusUpdate(true)}
            disabled={isUpdating}
          >
            Mark as Read
          </Button>
        )}

        {message.status === "new" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusUpdate(undefined, "in-progress")}
            disabled={isUpdating}
          >
            Start Processing
          </Button>
        )}

        {(message.status === "new" || message.status === "in-progress") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusUpdate(undefined, "replied")}
            disabled={isUpdating}
          >
            Mark as Replied
          </Button>
        )}

        {message.status !== "closed" && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleStatusUpdate(undefined, "closed")}
            disabled={isUpdating}
          >
            Close
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function ContactAdminClient() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "unread">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id: string, updates: Partial<Contact>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg._id === id ? { ...msg, ...updates } : msg))
    );
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "new") return message.status === "new";
    if (filter === "unread") return !message.isRead;
    return true;
  });

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">Loading contact messages...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
          <p className="text-muted-foreground mb-4">
            Manage and respond to contact form submissions ({messages.length}{" "}
            total)
          </p>

          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All ({messages.length})
            </Button>
            <Button
              variant={filter === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("new")}
            >
              New ({messages.filter((m) => m.status === "new").length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Unread ({messages.filter((m) => !m.isRead).length})
            </Button>
          </div>
        </div>

        {filteredMessages.length === 0 ? (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">
              {filter === "all" ? "No messages yet" : `No ${filter} messages`}
            </h3>
            <p className="text-muted-foreground">
              {filter === "all"
                ? "Contact form submissions will appear here."
                : `There are no ${filter} messages at the moment.`}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <ContactMessage
                key={message._id}
                message={message}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
