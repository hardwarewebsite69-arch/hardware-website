export type QuoteStatus = "pending" | "in_review" | "responded" | "closed";

export type QuoteMode = "upload" | "manual";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  image_url: string | null;
  image_public_id: string | null;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  price: number | null;
  request_price: boolean;
  is_active: boolean;
  featured_image_id: string | null;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  public_id: string;
  metadata: Record<string, unknown>;
  sort_order: number;
};

export type Quote = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  message: string | null;
  mode: QuoteMode;
  status: QuoteStatus;
  upload_url: string | null;
  upload_public_id: string | null;
  upload_metadata: Record<string, unknown>;
  created_at: string;
};

export type QuoteItemInput = {
  product_id?: string | null;
  item_name: string;
  quantity?: number | null;
  unit?: string | null;
  notes?: string | null;
};

export type Settings = {
  business_name: string;
  phone: string;
  whatsapp_number: string;
};
