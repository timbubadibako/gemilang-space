"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Ticket, DeveloperRateConfig } from "@/types/admin";
import { initialTickets, initialDevelopers } from "./admin-store";
import { blogPosts, BlogPost } from "@/data/blog-posts";
import { siteSettings } from "@/data/site-content";

interface AdminContextType {
  tickets: Ticket[];
  developers: DeveloperRateConfig[];
  posts: BlogPost[];
  siteMeta: typeof siteSettings;
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt">) => void;
  updateTicketStatus: (id: string, status: Ticket["status"]) => void;
  updateTicketPayout: (id: string, payoutStatus: Ticket["payoutStatus"]) => void;
  updateTicketClientPayment: (id: string, paymentStatus: Ticket["clientPaymentStatus"]) => void;
  deleteTicket: (id: string) => void;
  updateSiteMeta: (meta: Partial<typeof siteSettings>) => void;
  updatePost: (slug: string, updated: Partial<BlogPost>) => void;
  addPost: (post: BlogPost) => void;
  deletePost: (slug: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

const STORAGE_KEYS = {
  TICKETS: "gemilang_admin_tickets_v1",
  POSTS: "gemilang_admin_posts_v1",
  META: "gemilang_admin_meta_v1",
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [developers] = useState<DeveloperRateConfig[]>(initialDevelopers);
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [siteMeta, setSiteMeta] = useState(siteSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      if (storedTickets) setTickets(JSON.parse(storedTickets));

      const storedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (storedPosts) setPosts(JSON.parse(storedPosts));

      const storedMeta = localStorage.getItem(STORAGE_KEYS.META);
      if (storedMeta) setSiteMeta(JSON.parse(storedMeta));
    } catch {
      // Fallback silently if storage unavailable
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch {}
  }, [tickets, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch {}
  }, [posts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.META, JSON.stringify(siteMeta));
    } catch {}
  }, [siteMeta, isLoaded]);

  const addTicket = (data: Omit<Ticket, "id" | "createdAt">) => {
    const newId = `TCK-${Math.floor(100 + Math.random() * 900)}`;
    const newTicket: Ticket = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicketStatus = (id: string, status: Ticket["status"]) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const updateTicketPayout = (id: string, payoutStatus: Ticket["payoutStatus"]) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, payoutStatus } : t))
    );
  };

  const updateTicketClientPayment = (id: string, clientPaymentStatus: Ticket["clientPaymentStatus"]) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, clientPaymentStatus } : t))
    );
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSiteMeta = (meta: Partial<typeof siteSettings>) => {
    setSiteMeta((prev) => ({ ...prev, ...meta }));
  };

  const updatePost = (slug: string, updated: Partial<BlogPost>) => {
    setPosts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, ...updated } : p))
    );
  };

  const addPost = (post: BlogPost) => {
    setPosts((prev) => [post, ...prev]);
  };

  const deletePost = (slug: string) => {
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <AdminContext.Provider
      value={{
        tickets,
        developers,
        posts,
        siteMeta,
        addTicket,
        updateTicketStatus,
        updateTicketPayout,
        updateTicketClientPayment,
        deleteTicket,
        updateSiteMeta,
        updatePost,
        addPost,
        deletePost,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
};
