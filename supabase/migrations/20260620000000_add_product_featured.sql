-- Migration: Add is_featured column to products table
-- Created: 2026-06-20

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
