import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface QuoteItem {
  reference: string;
  designation: string;
  brand: string;
  quantity: number;
}

interface QuoteContextValue {
  items: QuoteItem[];
  count: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  has: (reference: string) => boolean;
  add: (item: Omit<QuoteItem, "quantity">, quantity?: number) => void;
  remove: (reference: string) => void;
  setQuantity: (reference: string, quantity: number) => void;
  clear: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);
const STORAGE_KEY = "rd-quote-list";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as QuoteItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((item: Omit<QuoteItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.reference === item.reference);
      if (existing) {
        return prev.map((i) =>
          i.reference === item.reference ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const remove = useCallback((reference: string) => {
    setItems((prev) => prev.filter((i) => i.reference !== reference));
  }, []);

  const setQuantity = useCallback((reference: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.reference === reference ? { ...i, quantity: Math.max(1, quantity) } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<QuoteContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      drawerOpen,
      setDrawerOpen,
      has: (reference: string) => items.some((i) => i.reference === reference),
      add,
      remove,
      setQuantity,
      clear,
    }),
    [items, drawerOpen, add, remove, setQuantity, clear],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote doit être utilisé dans un QuoteProvider");
  return ctx;
}
