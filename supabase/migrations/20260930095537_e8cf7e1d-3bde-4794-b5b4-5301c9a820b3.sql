CREATE TABLE public.prospects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT,
  societe TEXT,
  contact TEXT,
  besoin TEXT,
  resume_conversation TEXT,
  references_demandees TEXT[] NOT NULL DEFAULT '{}',
  secteur TEXT,
  source TEXT NOT NULL DEFAULT 'chatbot',
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.prospects TO anon;
GRANT INSERT ON public.prospects TO authenticated;
GRANT ALL ON public.prospects TO service_role;

ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a prospect" ON public.prospects FOR INSERT TO anon, authenticated WITH CHECK (true);